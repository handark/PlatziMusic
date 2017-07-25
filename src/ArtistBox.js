import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"

import { firebaseDatabase } from './firebase'


export default class ArtistBox extends Component {

    state = {
        like: false
    }


    handlePress = () => {

        const { id } = this.props.artist
        this.setState({ like: !this.state.like })

        firebaseDatabase.ref(`artist/${id}`).set()
    }

    toggleLike = () => {
        postRef.transaction(function(artist) {
            if (artist) {
            if (artist.stars && artist.stars[uid]) {
                artist.starCount--;
                artist.stars[uid] = null;
            } else {
                artist.starCount++;
                if (!artist.stars) {
                artist.stars = {};
                }
                artist.stars[uid] = true;
            }
            }
            return artist;
        });   
    }

  render() {

    //console.warn(`El nombre es ${this.props.artist.name}`)
    const { image, name, likes, comments } = this.props.artist;
    const likeIcon = this.state.like ? 
        <Icon name="ios-heart" size={30}  color='#e74c3c' /> : 
        <Icon name="ios-heart-outline" size={30}  color='gray' />

    return (
        <View style={styles.artistBox} >
            <Image style={styles.image} source={{ uri: image }} ></Image>
            <View style={styles.info} >
                <Text style={styles.name} >{name}</Text>
                <View style={styles.row} >
                    <View style={styles.iconContainer} >
                        <TouchableOpacity onPress={this.handlePress} >
                            {likeIcon}
                        </TouchableOpacity>
                        
                        <Text style={styles.count} >{likes}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="ios-chatboxes-outline" size={30} color='gray' ></Icon>
                        <Text style={styles.count} >{comments}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    artistBox: {
        margin: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: .9,
        shadowOffset: {
            height: 5,
            width: -2
        },
        elevation: 2
    },
    image: {
        width: 150,
        height: 150
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 20,
        marginTop: 10,
        color: '#333'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 40,
        marginTop: 15
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center'
    },
    count: {
        color: 'gray'
    }
});