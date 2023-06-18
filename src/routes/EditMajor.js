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

import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox } from '@rneui/themed';
import { Alert } from 'react-native';


export default function Home() {
  const [editMajor, setEditMajor] = useState("");
  const navigation = useNavigation();

  const saveProfile = () => {
    if (editMajor !== "") {
      setDoc(
        doc(db, "NUS", "users",`${auth.currentUser.uid}`, "profile"),
        { Name: editMajor },
        { merge: true }
      )
        .then(() => {
          console.log("Name updated successfully!");
          navigation.navigate('Edit', { updatedMajor: editMajor});
        })
        .catch((error) => {
          console.error("Error updating name: ", error);
        });
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileDoc = doc(db, "NUS", "users",`${auth.currentUser.uid}`, "profile");
        const docSnapshot = await getDoc(profileDoc);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setEditMajor(data.Major || "");
        } else {
          // Handle profile not found
        }
      } catch (error) {
        console.error("Error fetching profile data: ", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change your major</Text>

      <TextInput
        style={styles.input}
        placeholder="Edit Name"
        value={editMajor}
        onChangeText={(text) => setEditMajor(text)}
      />

      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.saveButton}
        onPress={saveProfile}
      >
        <Text style={styles.saveText}>Save Major</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: Dimensions.get('window').width - 20,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    height: 40,
    width: Dimensions.get('window').width - 100,
    backgroundColor: '#2de0ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});







