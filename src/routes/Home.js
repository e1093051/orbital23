import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import Chat from './Chat';
import Forum from './Forum';
import Profile from './Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StudyBuddy, { StudyBuddyPage } from './StudyBuddy';

import { createStackNavigator } from '@react-navigation/stack';

import Request from './Request';


const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();



export function HomePage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

const TopBar = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Find a Friend" component={HomePage} />
    <TopTab.Screen name="Study Buddy" component={StudyBuddy} />
  </TopTab.Navigator>
);

const BottomBar = () => {
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      initialRouteName="navigationHome"
    >
      <BottomTab.Screen
        name="navigationHome"
        component={TopBar}
        options={{
          tabBarLabel: 'Home',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => navigation.navigate('Request')}>
              <AntDesign color="black" name="hearto" size={16} />
            </TouchableOpacity>),
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarItemStyle: { marginTop: 3 },
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarItemStyle: { marginTop: 3 },
        }}
      />
      <BottomTab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarLabel: 'Photo',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarItemStyle: { marginTop: 3 },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarItemStyle: { marginTop: 3 },
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Home() {
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      initialRouteName="navigationHome"
    >
      <BottomTab.Screen
        name="navigationHome"
        component={TopBar}
        options={{
          tabBarLabel: 'Home',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style = {{marginRight: 10}}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('Request')}>
              <AntDesign color="black" name="hearto" size={18} />
            </TouchableOpacity>),
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarItemStyle: { marginTop: 3 },
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarItemStyle: { marginTop: 3 },
        }}
      />
      <BottomTab.Screen
        name="Forum"
        component={Forum}
        options={{
          tabBarLabel: 'Photo',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarItemStyle: { marginTop: 3 },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarLabelStyle: { marginBottom: 5 },
          tabBarItemStyle: { marginTop: 3 },
        }}
      />
    </BottomTab.Navigator>
  );
}




