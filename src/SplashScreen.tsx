import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import LoginRoute from './routes/Login'
import RegisterRoute from './routes/Register'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()


function App(): JSX.Element {
  return (
    <View style = {styles.container}>
      <Image 
        style = {{height: 100, width: 100}}
        source = {require('./Logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});

export default App;
