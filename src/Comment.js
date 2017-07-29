
import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const Comment = (props) =>
    <View style={styles.comment} >
        <Text style={styles.text} >{props.text}</Text>
    </View>

const styles = StyleSheet.create({
  comment: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    margin: 5,
    borderRadius: 5
  },
  text: {
      fontSize: 16
  }
});

export default Comment