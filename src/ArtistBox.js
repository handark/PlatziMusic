import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"

import { firebaseDatabase, firebaseAut } from './firebase'


export default class ArtistBox extends Component {

    state = {
        liked: false,
        likeCount: 0,
        commentsCount: 0,
        listaComentarios: []
    }

    componentWillMount(){
        const { uid } = firebaseAut.currentUser
        this.getArtistRef().on('value',  shapshot => {
            const artist = shapshot.val()
            if(artist){
                this.setState({
                    likeCount: artist.likeCount,
                    liked: artist.likes && artist.likes[uid],
                })
                this.listComnnets(artist)
            }
        } )

    }


    listComnnets = (artist) => {
        const { uid } = firebaseAut.currentUser
         this.getCommentsRef().on('value', shapshot=> {
            let comments = shapshot.val()
            if(comments){
                console.warn('comentarios',comments)
            }
            
        } )       
    }

    handlePress = () => {
       // this.setState({ liked: !this.state.liked })

        this.toggleLike(!this.state.liked)
    }

    getArtistRef = () => {
        const { id } = this.props.artist
        return firebaseDatabase.ref(`artist/${id}`)
    }

    getCommentsRef = () => {
        const { id } = this.props.artist;
        return firebaseDatabase.ref(`comments/${id}`)
    }

    toggleLike = (liked) => {
        const { uid } = firebaseAut.currentUser

        this.getArtistRef().transaction(function(artist) {
            if (artist) {
                if (artist.likes && artist.likes[uid]) {
                    artist.likeCount--;
                    artist.likes[uid] = null;
                } else {
                    artist.likeCount++;
                    if (!artist.likes) {
                    artist.likes = {};
                    }
                    artist.likes[uid] = true;
                }
            }
            return artist || {
                likeCount: 1,
                likes: {
                    [uid] : true
                },
                commentsCount: 0
            };
        });   
    }

  render() {

    //console.warn(`El nombre es ${this.props.artist.name}`)
    const { image, name, likes, comments } = this.props.artist;
    const likeIcon = this.state.liked ? 
        <Icon name="ios-heart" size={30}  color='#e74c3c' /> : 
        <Icon name="ios-heart-outline" size={30}  color='gray' />

    const { likeCount } = this.state 
    const { commentsCount } = this.state

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
                        
                        <Text style={styles.count} >{likeCount}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon name="ios-chatboxes-outline" size={30} color='gray' ></Icon>
                        <Text style={styles.count} >{commentsCount}</Text>
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