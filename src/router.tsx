import React, { Component, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entrance from './routes/Entrance'
import Login from './routes/Login';
import Register from './routes/Register'
import Register2 from './routes/Register2';
import Register3 from './routes/Register3';
import forgetPassword from './routes/forgetPassword';
import Form from './routes/Form';
import Form1 from './routes/Form1';
import Form2 from './routes/Form2';
import Form3 from './routes/Form3';
import Form4 from './routes/Form4';
import Form5 from './routes/Form5';
import Form6 from './routes/Form6';
import Form7 from './routes/Form7';
import Photo from './services/Photo';

import Home from './routes/Home';
import StudyBuddy from './routes/StudyBuddy';
import Request from './routes/Request';
import Setting from './routes/Setting';
import Chat from './routes/Chat';
import Forum from './routes/Forum';
import Edit from './routes/Edit';
import EditName from './routes/EditName';
import EditBio from './routes/EditBio';
import EditCourse from './routes/EditCourse';
import EditMajor from './routes/EditMajor';
import EditHobby from './routes/EditHobby';
import EditYear from './routes/EditYear';
import EditCountryAndRegion from './routes/EditCountryAndRegion';
import EditShowMajor from './routes/EditShowMajor';
import EditShowCourse from './routes/EditShowCourse';
import EditShowHobby from './routes/EditShowHobby';
import EditShowCountryAndRegion from './routes/EditShowCountryAndRegion';
import EditPhoto from './routes/EditPhoto';
import EditShowYear from './routes/EditShowYear';
import Filter from './routes/Filter';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';

import { setMajor } from '../api/setProfile';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName='Login' >
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='forgetPassword' component={forgetPassword}
      options={{ headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff' }} />
    <Stack.Screen name='Register' component={Register}
      options={{ headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff' }} />
    <Stack.Screen name='Register2' component={Register2}
      options={{ headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff' }} />
    <Stack.Screen name='Register3' component={Register3}
      options={{ headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff' }} />
    <Stack.Screen name='Home' component={Home}
      options={{ headerShown: false, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff' }} />

    <Stack.Screen name='Form' component={Form}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'Personal Profile',
        headerBackTitle: ' ',
        headerTintColor: '#2de0ff',
      })} />

    <Stack.Screen name='Form1' component={Form1}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'Personal Profile',
        headerBackTitle: ' ',
        headerTintColor: '#2de0ff',
      })} />

      <Stack.Screen name='Form2' component={Form2}
      options={{ headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff' }} />

      
    <Stack.Screen name='Form3' component={Form3}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'Personal Profile',
        headerBackTitle: ' ',
        headerTintColor: '#2de0ff',
      })} />

    <Stack.Screen name='Form4' component={Form4}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'Personal Profile',
        headerBackTitle: ' ',
        headerTintColor: '#2de0ff',
      })} />

    <Stack.Screen name='Form5' component={Form5}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'Personal Profile',
        headerBackTitle: ' ',
        headerTintColor: '#2de0ff',
      })} />


    <Stack.Screen name='Form6' component={Form6}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'Personal Profile',
        headerBackTitle: ' ',
        headerTintColor: '#2de0ff',
      })} />

      <Stack.Screen name='Form7' component={Form7}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'Personal Profile',
        headerBackTitle: ' ',
        headerTintColor: '#2de0ff',
      })} />

    <Stack.Screen name='Photo' component={Photo}
      options={{ headerShown: true, headerTitle: 'Personal Profile', headerBackTitle: ' ', headerTintColor: '#2de0ff' }} />
    <Stack.Screen name='StudyBuddy' component={StudyBuddy}
      options={{ headerShown: true, headerTitle: ' ', headerBackTitle: ' ', headerTintColor: '#2de0ff' }} />
    <Stack.Screen name='Request' component={Request} />
    <Stack.Screen name='Chat' component={Chat} />
    <Stack.Screen name='Forum' component={Forum} />
    <Stack.Screen name='Setting' component={Setting} />
    <Stack.Screen name='Edit' component={Edit} />
    <Stack.Screen name="EditName" component={EditName} />
    <Stack.Screen name="EditBio" component={EditBio} />
    <Stack.Screen name="EditMajor" component={EditMajor} />
    <Stack.Screen name="EditCourse" component={EditCourse} />
    <Stack.Screen name="EditPhoto" component={EditPhoto} />
    <Stack.Screen name="EditHobby" component={EditHobby}
      options={{
        headerShown: true,
        headerTitle: 'Hobby',
        headerBackTitle: ' ',
        headerTintColor: 'black'}}/>
    <Stack.Screen name="EditCountryAndRegion" component={EditCountryAndRegion} />
    <Stack.Screen name="EditYear" component={EditYear} />
    <Stack.Screen name="EditShowMajor" component={EditShowMajor} />
    <Stack.Screen name="EditShowCourse" component={EditShowCourse} />
    <Stack.Screen name="EditShowCountryAndRegion" component={EditShowCountryAndRegion} />
    <Stack.Screen name="EditShowYear" component={EditShowYear} />
    <Stack.Screen name="EditShowHobby" component={EditShowHobby} />
    <Stack.Screen name="Filter" component={Filter} 
    options={{headerShown: true}}/>
  </Stack.Navigator>
);

/**
 *  <Stack.Screen name="EditHobby" component={EditHobby}
      options={({ navigation }) => ({
        headerShown: true,
        headerTitle: 'Hobby',
        headerBackTitle: ' ',
        headerTintColor: 'black',
        headerRight: () => (
          <TouchableOpacity
          style={{ marginRight: 10 }}
          activeOpacity={0.75}
          onPress={() => saveProfile()}>
             <Text>Save</Text>
        </TouchableOpacity>
        ),
      })}/>
 */


function Router(): JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default Router;
