import React, { Component, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Entrance from './routes/Entrance'
import Login from './routes/Login';
import Register from './routes/Register'
import Register2 from './routes/Register2';
import Register3 from './routes/Register3';
import forgetPassword from './routes/forgetPassword';
import Home from './routes/Home';
import Form from './routes/Form';
import Form1 from './routes/Form1';
import Form2 from './routes/Form2';
import Form3 from './routes/Form3';
import Form4 from './routes/Form4';
import Form5 from './routes/Form5';
import Form6 from './routes/Form6';
import Form7 from './routes/Form7';
import Photo from './services/Photo'

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false,}}>
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='forgetPassword' component={forgetPassword} 
    options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
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
    <Stack.Screen name='Form1' component={Form1} 
    options={{headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Form2' component={Form2} 
    options={{headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Form3' component={Form3} 
    options={{headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Form4' component={Form4} 
    options={{headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Form5' component={Form5}
    options={{headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Form6' component={Form6} 
    options={{headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
    <Stack.Screen name='Form7' component={Form7} 
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
