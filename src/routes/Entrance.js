import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'

class Entrance extends Component {
  render() {
    return(
      <View style = {styles.container}>
        <Image 
          style = {{height: 150, width: 150, margin: 50}}
          source = {require('./Logo.png')}
        />
        <TouchableOpacity
        activeOpacity = {0.75}
        style = {styles.loginButton}
        onPress = {() => this.props.navigation.push('Login')} >
          <Text style = {styles.loginText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
        activeOpacity = {0.75}
        style = {styles.registerButton} >
          <Text style = {styles.registerText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    height: 40,
    width: 200,
    backgroundColor: '#2deaff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  registerButton: {
    height: 40,
    width: 200,
    backgroundColor: '#FFFFFF',
    borderColor: '#2deaff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default connect() (Entrance);
