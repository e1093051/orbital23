import React, { useState, useEffect, Component, Linking } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

import Chat from './Chat';
import Forum from './Forum';
import StudyBuddy, { StudyBuddyPage } from './StudyBuddy';

import { createStackNavigator } from '@react-navigation/stack';
import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import Request from './Request';
import { generateMatchingPool } from '../../api/matching';


const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();



export function HomePage() {
  //generateMatchingPool();
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


export default function Home() {

  const ProfilePage = () => {

    const navigation = useNavigation();
  
    const [profileData, setProfileData] = useState(null);
  
    const getData = () => {
      getDoc(doc(db, "NUS/users", auth.currentUser.uid, "profile"))
        .then(docSnap => setProfileData(docSnap.data()));
    }
  
    useEffect(() => {
      getData();
    }, [])
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate("Edit")}>
            <Text>Edit</Text>
          </TouchableOpacity>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Name</Text>
          {auth.currentUser && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{auth.currentUser.displayName}</Text>}
        </View>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Year</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.year}</Text>}
        </View>
        <View style={{ width: Dimensions.get('window').width - 60, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Course</Text>
          {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.course.join(", ")}</Text>}
        </View>
      </View>
    );
  }


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
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style = {{marginRight: 10}}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('Setting')}>
              <AntDesign color="black" name="setting" size={18} />
            </TouchableOpacity>),
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




