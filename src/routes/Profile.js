import React, { useState, useEffect, Component, Linking } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CheckBox, Icon } from '@rneui/themed';
import Stack from '@mui/material/Stack';

import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";


import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';




export default () => {

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
      {profileData && <Text>{profileData.year}</Text>}
      {auth.currentUser && <Text>{auth.currentUser.displayName}</Text>}
      {auth.currentUser && <Image
      style = {{width: 100, height: 100}}
      source={{uri: auth.currentUser.photoURL}}/>}
    </View>
  );
}

const styles = StyleSheet.create({

  container_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left: 1
  },
  bigContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
});




