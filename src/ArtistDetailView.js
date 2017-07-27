/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Icon
} from 'react-native';

import ArtistBox from './ArtistBox';
import { getArtists } from './api-client'

export default class ArtistDetailView extends Component {

    state = {
        text: ''
    }

    handleSend = () => {
        console.warn("Enviar")
    }

  render() {

    const artist = this.props.artist;

    return (
        <View style={styles.container} >
            <ArtistBox artist={artist} />
            <View style={styles.inputContainer} >
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <TouchableOpacity onPress={this.handleSend} >
                    <Icon name="ios-send-outline" size={30}  color='#e74c3c' />
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray',
        paddingTop: 10,
        flexDirection: 'row'
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        right:0,
        left: 0,
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 10
    },
    input: {
        height: 50
    }
});

