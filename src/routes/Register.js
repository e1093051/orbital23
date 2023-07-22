import React, { Component, useState, useRef, Alert } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default () => {
  const [name, setName] = useState("");

  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('Register2', { name })
  }

  return (
    <View style = {styles.bigContainer}>
      <View style = {styles.container}>
      <Text style = {styles.mainText}>What's your name?</Text>
      <Text style = {styles.usual}>Enter the name you use in real life.  This will be shown as your name other users.
      You can always change it later. </Text>
      <TextInput
          style={{ height: 40, width: Dimensions.get('window').width - 20, borderWidth: 1, margin: 10, marginTop: -3}}
          placeholder = " Name"
          value={name}
          onChangeText={setName}
      />
      <TouchableOpacity
          activeOpacity={0.75}
          style={styles.signUpButton}
          onPress={() => handleNext()}>
          <Text style={styles.signUpText}>Next</Text>        
      </TouchableOpacity>
      </View>
      <TouchableOpacity
          activeOpacity={0.75}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Login')} >
          <Text style={styles.registerText}>Log in</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  mainText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    margin: 10
  },
  usual: {
    color: 'black',
    fontSize: 14,
    margin: 10,
    marginTop: -5
  },
  small: {
    color: 'gray',
    fontSize: 14
  },
  signUpButton: {
    height: 40,
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#2de0ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    margin: 0
  },
  signUpText: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttomContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 15,
    backgroundColor: 'white',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  registerText: {
    color: '#2de0ff',
    fontWeight: 'bold',
  },
});