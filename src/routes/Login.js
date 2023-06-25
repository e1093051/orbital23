//reference to https://github.com/purfectliterature/simplist/tree/main

import * as firebase from "firebase/app";
import React, { Component, useState, useRef } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '../../api/fireConfig'

import * as Authentication from "../../api/auth";

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
    Authentication.logIn(
      { email, password },
      (user) =>  navigation.navigate('Home'),
      (user) =>  navigation.navigate('Home'),
      (error) => Alert.alert('error',(error.message || 'Something went wrong, try again later'))
    );
  }

  const handleFirstTimeLogin = () => {
    Authentication.logIn(
      { email, password },
      (user) =>  navigation.navigate('Form'),
      (user) =>  navigation.navigate('Form'),
      (error) => Alert.alert('error',(error.message || 'Something went wrong, try again later'))
    );
  }



  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={{ height: 150, width: 150, margin: 20 }}
          source={require('./Logo.png')}
        />
        <TextInput
          style={{ height: 40, width: 220, borderWidth: 1, margin: 10 }} d
          placeholder = " NUS email (@u.nus.edu)"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{ height: 40, width: 220, borderWidth: 1, margin: 10 }}
          placeholder = " Password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.loginButton}
          onPress={() => handleLogin()}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.loginButton}
          onPress={() => handleFirstTimeLogin()}>
          <Text style={styles.loginText}>First Time Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.forgetPasswordButton}>
          <View style={styles.line}>
            <Text style={styles.forgetPasswordText}>Forgot Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Register')} >
          <Text style={styles.registerText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    height: 40,
    width: 200,
    backgroundColor: '#2de0ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgetPasswordButton: {
    height: 40,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: -5
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    //width: '75%', 
  },
  forgetPasswordText: {
    color: 'black',
    fontWeight: 'bold',
  },
  registerButton: {
    height: 40,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  buttonContainer: {
    position: 'absolute',
    //left: 0,
    //right: 0,
    bottom: 15,
    //borderColor: '#2de0ff',
    //borderWidth: 1,
    //height: 40,
    //width: 200,
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

