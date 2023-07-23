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
import { useNavigation, useRoute } from '@react-navigation/native';

import Chat from './Chat';
import Forum from './Forum';
import StudyBuddy, { StudyBuddyPage } from './StudyBuddy';

import { createStackNavigator } from '@react-navigation/stack';
import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import Request from './Request';
import { generateMatchingPool } from '../../api/matching';
import { Alert } from 'react-native';


import {
  updateBio
} from '../../api/setProfile';



export default function EditBio() {
  const route = useRoute();
  const { bio } = route.params;
  const [editBio, setEditBio] = useState(bio);
  const navigation = useNavigation();
  const handleUpdateBio = () => {
    updateBio({bio: editBio}, () => navigation.goBack(), (error) => console.log(error.message));
  }


  const saveProfile = () => {
    if (editBio != "") {
      handleUpdateBio();}
    else {
      Alert.alert(('error',('Bio cannot be empty')))
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change your bio</Text>

      <TextInput
        style={styles.input}
        placeholder="Edit Bio"
        value={editBio}
        onChangeText={(text) => setEditBio(text)}
      />

      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.saveButton}
        onPress={saveProfile}
      >
        <Text style={styles.saveText}>Save Bio</Text>
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
  resetButton: {
    height: 40,
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  resetText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});








