import React, { Component, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Entrance from './routes/Entrance'
import Login from './routes/Login';
import Register from './routes/Register'
import Register2 from './routes/Register2';
import Register3 from './routes/Register3';
import Home from './routes/Home';
import Form from './routes/Form';
import Photo from './services/Photo'

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false,}}>
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='Register' component={Register} 
    options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Register2' component={Register2} 
    options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Register3' component={Register3} 
    options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Home' component={Home} 
    options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Form' component={Form} 
    options={{headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
     <Stack.Screen name='Photo' component={Photo} 
    options={{headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
  </Stack.Navigator>
);


function Router(): JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default Router;
