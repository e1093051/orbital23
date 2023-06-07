import React, { Component, useState, useRef, Alert } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import auth from '../../api/fireConfig'
import * as Authentication from "../../api/auth";

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
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const handleNext = async () => {
  try {
    await Authentication.resetPassword(
      { email },
      () => {
        Alert.alert("Password reset email sent");
        navigation.navigate('Login');
      },
      (error) => {
        Alert.alert("Error resetting password", error.message);
      }
    );
  } catch (error) {
    Alert.alert("Error resetting password", error.message);
  }
};

  return (
    <View style = {styles.bigContainer}>
      <View style = {styles.container}>
      <Text style = {styles.mainText}>What's your Email Address</Text>
      <Text style = {styles.usual}>Enter the email address you used to sign up. You will get an email on this address to reset your password </Text>
      <TextInput
          style={{ height: 40, width: Dimensions.get('window').width - 20, borderWidth: 1, margin: 10, marginTop: -3}}
          //placeholder = " Name"
          value={email}
          onChangeText={setEmail}
      />
      <TouchableOpacity
          activeOpacity={0.75}
          style={styles.signUpButton}
          onPress={() => handleNext()}>
          <Text style={styles.signUpText}>Send me an email</Text>        
      </TouchableOpacity>
      </View>
      <TouchableOpacity
          activeOpacity={0.75}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Login')} >
          <Text style={styles.registerText}>Back to Log in</Text>
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