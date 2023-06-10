import React from 'react';
import { View, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Chat from './Chat';
import Forum from './Forum';
import Profile from './Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StudyBuddy, { StudyBuddyPage } from './StudyBuddy';

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
    <TopTab.Screen name="Home" component={HomePage} />
    <TopTab.Screen name="StudyBuddy" component={StudyBuddy} />
  </TopTab.Navigator>
);

const BottomBar = () => (
  <BottomTab.Navigator
    initialRouteName="navigationHome"
  >
    <BottomTab.Screen
      name="navigationHome"
      component={TopBar}
      options={{
        tabBarLabel: 'Home',
        headerShown: false,
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

export default function Home() {
  return (
    <NavigationContainer independent={true}>
        <BottomBar />
    </NavigationContainer>
  )
}




