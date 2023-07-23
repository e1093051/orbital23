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

import { Image } from 'react-native';



import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';


export default () => {


  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [name, setName] = useState ("")
  const [bio, setBio] = useState ("")
  const [major, setMajor] = useState ("")
  const [countryAndRegion, setCountryAndRegion] = useState ("")
  const [year, setYear] = useState ("")
  const[course,setCourse]=useState([])
  const[hobby,setHobby]=useState([])


  const getData = () => {
    onSnapshot(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), (doc) => {
      setProfileData(doc.data());
    });
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', paddingTop: 5 }}>
      <TouchableOpacity onPress={() => navigation.navigate('EditName', {name: profileData.name})}>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Name</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.name}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditBio', {bio: profileData.bio})} >
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Bio</Text>
          {auth.currentUser && profileData && (
            <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
              {profileData.bio}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditMajor', {major: profileData.major, showMajor: profileData.showMajor})} >
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Major</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.major}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditCourse', {course: profileData.course, showCourse: profileData.showCourse})}>
        <View style={{ width: Dimensions.get('window').width - 60, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Course</Text>
          {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.course.join(", ")}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditHobby', {hobby: profileData.hobby, showHobby: profileData.showHobby})} >
        <View style={{ width: Dimensions.get('window').width - 60, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Hobby</Text>
          {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.hobby.join(", ")}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditCountryAndRegion', {countryAndRegion: profileData.countryAndRegion, showCountryAndRegion: profileData.showCountryAndRegion})}>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Country/Region</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.countryAndRegion}</Text>}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditYear', {year: profileData.year, showYear: profileData.showYear})}>
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




