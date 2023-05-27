import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Entrance from './routes/Entrance'
import Login from './routes/Login';
import Register from './routes/Register'

const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false,}}>
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='Register' component={Register} 
    options={{headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff'}}/>
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
