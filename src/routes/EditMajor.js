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
import { Dropdown } from 'react-native-element-dropdown';


import {
  updateMajor
} from '../../api/setProfile';

const saveProfile = () => {
  if (EditMajor.editMajor != "") {
    handleUpdateMajor();
  }
  else {
    Alert.alert('error', 'Major cannot be empty');
  }
};


export default function EditMajor() {

  const majorData = [
    { label: 'Pharmacy', value: 'Pharmacy' },
    { label: 'Nursing', value: 'Nursing' },
    { label: 'Medicine', value: 'Medicine' },
    { label: 'Architecture', value: 'Architecture' },
    { label: 'Computer Engineering', value: 'Computer Engineering' },
    { label: 'Industrial Design', value: 'Industrial Design' },
    { label: 'Landscape Architecture', value: 'Landscape Architecture' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Biomedical Engineering', value: 'Biomedical Engineering' },
    { label: 'Chemical Engineering', value: 'Chemical Engineering' },
    { label: 'Civil Engineering', value: 'Civil Engineering' },
    { label: 'Electrical Engineering', value: 'Electrical Engineering' },
    { label: 'Engineering Science', value: 'Engineering Science' },
    { label: 'Environmental Engineering', value: 'Environmental Engineering' },
    { label: 'Industrial & Systems Engineering', value: 'Industrial & Systems Engineering' },
    { label: 'Infrastructure & Project Management', value: 'Infrastructure & Project Management' },
    { label: 'Material Science & Engineering', value: 'Material Science & Engineering' },
    { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
    { label: 'Dentistry', value: 'Dentistry' },
    { label: 'Business Analytics', value: 'Business Analytics' },
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Information Systems', value: 'Information Systems' },
    { label: 'Information Security', value: 'Information Security' },
    { label: 'Business Administration (Accounting)', value: 'Business Administration (Accounting)' },
    { label: 'Business Administration', value: 'Business Administration' },
    { label: 'Real Estate', value: 'Real Estate' },
    { label: 'Anthropology', value: 'Anthropology' },
    { label: 'Chinese Language', value: 'Chinese Language' },
    { label: 'Chinese Studies', value: 'Chinese Studies' },
    { label: 'Communications and New Media', value: 'Communications and New Media' },
    { label: 'Economics', value: 'Economics' },
    { label: 'English Language', value: 'English Language' },
    { label: 'English Literature', value: 'English Literature' },
    { label: 'Geography', value: 'Geography' },
    { label: 'Global Studies', value: 'Global Studies' },
    { label: 'History', value: 'History' },
    { label: 'Japanese Studies', value: 'Japanese Studies' },
    { label: 'Malay Studies', value: 'Malay Studies' },
    { label: 'Philosophy', value: 'Philosophy' },
    { label: 'Political Science', value: 'Political Science' },
    { label: 'Psychology', value: 'Psychology' },
    { label: 'Social Work', value: 'Social Work' },
    { label: 'Sociology', value: 'Sociology' },
    { label: 'South Asian Studies', value: 'South Asian Studies' },
    { label: 'Southeast Asian Studies', value: 'Southeast Asian Studies' },
    { label: 'Theatre Studies', value: 'Theatre Studies' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Data Science and Analytics', value: 'Data Science and Analytics' },
    { label: 'Life Sciences', value: 'Life Sciences' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Quantitative Finance', value: 'Quantitative Finance' },
    { label: 'Statistics', value: 'Statistics' },
  ];
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  const route = useRoute();
  const {major} = route.params;
  const [editMajor, setEditMajor] = useState(major);
  const navigation = useNavigation();
  const handleUpdateMajor = () => {
    updateMajor({ major: editMajor }, () => navigation.navigate("Edit"), (error) => Alert.alert('error', (error.message || 'Something went wrong, try again later')));
  }

  const saveProfile = () => {
    if (editMajor != "") {
      handleUpdateMajor();
    }
    else {
      Alert.alert('error', 'Major cannot be empty');
    }
  };


  return (

  <View style={styles.container}>
      <Text style={styles.title}>Change your major</Text>

      <Dropdown
        search
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        maxHeight={300}
        labelField="label"
        data={majorData}
        onChange={item => setEditMajor(item.value)}
        value={editMajor}
        placeholder="Select your major"
        valueField="value"
      />

      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.saveButton}
        onPress={saveProfile}
      >
        <Text style={styles.saveText}>Save Major</Text>
      </TouchableOpacity>
    </View>
  )}   

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