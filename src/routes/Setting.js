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
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";

import Request from './Request';
import { generateMatchingPool, initializeMatch, updateRecommendAndPoint, setMatchValue, updateAvoid, match } from '../../api/matching';
import { showMajorAPI } from '../../api/setProfile';

export default () => {

  const navigation = useNavigation();

  const [profileData, setProfileData] = useState(null);
  const [showMajor, setShowMajor] = useState ("")
  const [showCourse, setShowCourse] = useState ("")
  const [showHobby, setShowHobby] = useState ("")
  const [showCountryAndRegion, setShowCountryAndRegion] = useState ("")
  const [showYear, setShowYear] = useState ("")

  const getData = () => {
<<<<<<< HEAD
      onSnapshot(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), (doc) => {
=======
      onSnapshot(doc(db, "NUS", "users", "profile", `${auth.currentUser.uid}`), (doc) => {
>>>>>>> 0d3f7a2f12d3d9e96a9bf451db0efc453f586ce2
        setProfileData(doc.data());})
    }

    useEffect(() => {
      getData();
    }, [])

    useEffect(() => {
    if (profileData) {
      setShowMajor(profileData.showMajor);
      setShowCourse(profileData.showCourse);
      setShowHobby(profileData.showHobby);
      setShowCountryAndRegion(profileData.showCountryAndRegion);
      setShowYear(profileData.showYear);
      
    }
  }, [profileData]);

  return (
  <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: 'white' }}>
     <Text style={{ fontSize: 15,marginLeft: 10, marginTop: 10, marginBottom:10, color: "#939799"}}>Account Settings</Text>

     <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5, marginLeft: 10}}>Email</Text>
          {<Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{auth.currentUser.email}</Text>}
     </View>

     <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>

     <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5, marginLeft:10 }}>Password</Text>
          {<Text style={{ color: '#2de0ff', marginBottom: 5, marginTop: 5 }}>Click here to change your password</Text>}
     </View>

     </TouchableOpacity>

     <Text style={{ fontSize: 15,marginLeft: 10, marginTop: 10,marginBottom:10, color: "#939799"}}>Profile Privacy Settings</Text>

    <TouchableOpacity onPress={() => navigation.navigate('EditShowMajor', {showMajor})}>

     <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
      <Text style={{ width: 80, marginBottom: 5, marginTop: 5, marginLeft: 10 }}>Major</Text>
      {profileData && (
      <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
      {profileData.showMajor ? 'Everyone' : 'No one'}
      </Text>
       )}
    </View>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.navigate('EditShowCourse', {showCourse})}>


     <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
      <Text style={{ width: 80, marginBottom: 5, marginTop: 5, marginLeft: 10 }}>Course</Text>
      {profileData && (
      <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
      {profileData.showCourse ? 'Everyone' : 'No one'}
      </Text>
       )}
    </View>

    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('EditShowHobby', {showHobby})}>

     <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
      <Text style={{ width: 80, marginBottom: 5, marginTop: 5, marginLeft: 10 }}>Hobby</Text>
      {profileData && (
      <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
      {profileData.showHobby ? 'Everyone' : 'No one'}
      </Text>
       )}
    </View>

    </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.navigate('EditShowCountryAndRegion', {showCountryAndRegion})}>

     <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
      <Text style={{ width: 80, marginBottom: 5, marginTop: 5, marginLeft: 10 }}>Country/Region</Text>
      {profileData && (
      <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
      {profileData.showCountryAndRegion ? 'Everyone' : 'No one'}
      </Text>
       )}
    </View>

    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('EditShowYear', {showYear})}>

     <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
      <Text style={{ width: 80, marginBottom: 5, marginTop: 5, marginLeft: 10 }}>Year</Text>
      {profileData && (
      <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
      {profileData.showYear ? 'Everyone' : 'No one'}
      </Text>
       )}
    </View>

    </TouchableOpacity>

  </View>

  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    color: "#939799"
  },
});