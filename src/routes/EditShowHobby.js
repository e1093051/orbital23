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
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import Chat from './Chat';
import Forum from './Forum';
import StudyBuddy, { StudyBuddyPage } from './StudyBuddy';

import { createStackNavigator } from '@react-navigation/stack';
import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";

import Request from './Request';
import { generateMatchingPool, initializeMatch, updateRecommendAndPoint, setMatchValue, updateAvoid, match } from '../../api/matching';

import {
  showMajorAPI,
  showCountryAndRegionAPI,
  showCourseAPI,
  showYearAPI,
  showHobbyAPI
} from '../../api/setProfile';

export default () => {

    const whoCanSeeData = [
    { label: 'Everyone', value: 'Everyone' },
    { label: 'No one', value: 'No one' },
  ];

  const route = useRoute();
  const { showHobby } = route.params;
  const [editShowHobby, setEditShowHobby] = useState(showHobby);
  const navigation = useNavigation();
  const handleUpdateShowHobby = () => {
    const newShowHobbyValue = editShowHobby === 'No one' ? false : true;
    showHobbyAPI({showHobby: newShowHobbyValue});
    navigation.navigate('Setting');
  }


  const saveProfile = () => {
    if (editShowHobby != "") {
      handleUpdateShowHobby();}
    else {
      Alert.alert('error', 'Cannot be empty');

    }
  };


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Change your settings for hobby</Text>

      <Dropdown
        search
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        maxHeight={300}
        labelField="label"
        data={whoCanSeeData}
        onChange={item => setEditShowHobby(item.value)}
        value={showHobby}
        placeholder="Select your option"
        valueField="value"
      />

      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.saveButton}
        onPress={saveProfile}
      >
        <Text style={styles.saveText}>Save Settings For Hobby</Text>
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
  dropdown: {
    width: Dimensions.get('window').width - 20,
    height: 40,
    marginBottom: 10,
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