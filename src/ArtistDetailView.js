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
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import { firebaseAuth, firebaseDatabase } from './firebase'
import ArtistBox from './ArtistBox'
import CommentList from './CommentList'

export default class ArtistDetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : '',
            comments: []
        }
    }


  handleSend = () => {
    const artistCommentsRef = this.getArtistCommentsRef()
    const {text} = this.state
    var newCommentRef = artistCommentsRef.push()
    newCommentRef.set(text);
    this.setState({ text: '' })
  }

  getArtistCommentsRef = () => {
    const { id } = this.props.artist
    return firebaseDatabase.ref(`comments/${id}`)
  }

  handleChangeText = (text) => this.setState({ text })

  render() {
    const artist = this.props.artist
    const { comments } = this.state

    return (
      <View style={styles.container}>
        <ArtistBox artist={artist} />
        <CommentList comments={comments} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Opina sobre este artista"
            onChangeText={this.handleChangeText}
            value={this.state.text}
          />
          <TouchableOpacity onPress={this.handleSend}>
            <Icon name="ios-send-outline" size={30} color="gray" />
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
    paddingTop: 5,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 50,
    flex: 1
  }
});