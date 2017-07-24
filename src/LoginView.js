/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import FBSDK, {
  AccessToken,
  LoginButton
} from 'react-native-fbsdk';

import { Actions } from 'react-native-router-flux'
import firebase, { firebaseAut } from "./firebase";

const { FacebookAuthProvider } = firebase.auth;


export default class LoginView extends Component {

    state = {
        credentials: null
    }

    componentWillMount(){
        this.authenticateUser()
    }

    authenticateUser = () => {
        AccessToken.getCurrentAccessToken().then((data) => {
            const { accessToken } = data
            const credential = FacebookAuthProvider.credential(accessToken)
            firebaseAut.signInWithCredential(credential).then((credentials) => {
                //this.setState({ credentials })
                Actions.home();

            }, function(error) {
                console.log("Sign In Error", error);
            });
        }).catch((error)=>{
            console.log("Sign in error", error)
        });
    }

    handleLoginFinished = (error, result) => {
        if (error) {
            console.error(error)
        } else if (result.isCancelled) {
            alert("login is cancelled.");
        } else {
            this.authenticateUser()
            //Actions.home();

        }   
    }

    handleButtonPress = () => {
        Actions.home();
    }

  render() {

    return (
        <View style={styles.container} >
            <Text style={styles.welcome} >Bienvenidos a PlatziMusic</Text>
            <LoginButton
                readPermissions={["public_profile","email"]}
                onLoginFinished={ this.handleLoginFinished }
                onLogoutFinished={() => alert("logout.")} 
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center'

    },
    welcome: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
    }
});

