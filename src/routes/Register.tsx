import React, {Component} from 'react';
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

function Register(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style = {styles.bigContainer}>
      <View style = {styles.container}>
      <Text style = {styles.mainText}>What's your NUS email?</Text>
      <Text style = {styles.usual}>Enter your NUS webmail (ends with @u.nus.edu) to receive the verification code. 
        We will not show this to other users.</Text>
      <TextInput
          style={{ height: 40, width: Dimensions.get('window').width - 20, borderWidth: 1, margin: 10}}
          placeholder = " NUS email (@u.nus.edu)"
      />
      <TouchableOpacity
          activeOpacity={0.75}
          style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sign up</Text>        
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
    margin: 3,
    left: 7
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

export default Register;
