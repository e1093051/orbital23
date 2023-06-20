import React, { useState, useEffect, Component, Linking } from 'react';

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


import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';


export default () => {


  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState ("")
  const [bio, setBio] = useState ("")
  const [major, setMajor] = useState ("")
  const [countryAndRegion, setCountryAndRegion] = useState ("")
  const [year, setYear] = useState ("")
  const[course,setCourse]=useState("")
  const[hobby,setHobby]=useState("")

  const getData = () => {
    onSnapshot(doc(db, "NUS", "users",`${auth.currentUser.uid}`, "profile"), (doc) => {
      setProfileData(doc.data());
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (profileData) {
      setName(profileData.name);
      setBio(profileData.bio);
      setMajor(profileData.major);
      setCountryAndRegion(profileData.countryAndRegion);
      setYear(profileData.year);
      setCourse(profileData.course);
      setHobby(profileData.hobby);
    }
  }, [profileData]);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', paddingTop: 20 }}>

      <TouchableOpacity onPress={() => navigation.navigate('EditName', {name})}>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Name</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.name}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditBio', {bio})} >
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Bio</Text>
          {auth.currentUser && profileData && (
            <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
              {profileData.bio}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditMajor', {major})} >
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Major</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.major}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditCourse')}>
        <View style={{ width: Dimensions.get('window').width - 60, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Course</Text>
          {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.course.join(", ")}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditHobby')} >
        <View style={{ width: Dimensions.get('window').width - 60, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Hobby</Text>
          {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.hobby.join(", ")}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditCountryAndRegion')}>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Country/Region</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.countryAndRegion}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditYear')}>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Year</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.year}</Text>}
        </View>
      </TouchableOpacity>
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




