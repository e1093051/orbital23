import React, { useState, useEffect, Component, Linking } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Button
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


import {
  setBio,
  setGender,
  setMajor,
  setCourse,
  setCountryAndRegion,
  setHobby,
  setYear,
} from '../../api/setProfile';

export default function Home() {
    const [editName, setEditName] = useState("");
    useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileDoc = doc(db, 'NUS', 'users', 'profile', auth.currentUser.uid);
        const docSnapshot = await getDoc(profileDoc);
        
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setProfileData(data);
        } else {
        }
      } catch (error) {

      }
    };

    fetchProfileData();
  }, []);

   const saveProfile = () => {
    if (editYear !== "") {
      setYear(
        {
          Name: editName,
          showName: true,
        },
        () => {
          console.log("Year updated successfully!");
        },
        (error) => {
          console.error("Error updating year: ", error);
        }
      );
    }
};

return(

    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Edit Year"
        value={editYear}
        onChangeText={(text) => setEditYear(text)}
      />
<Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});







