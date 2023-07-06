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
import { Dropdown } from 'react-native-element-dropdown';

import { createStackNavigator } from '@react-navigation/stack';
import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";

import Request from './Request';
import { generateMatchingPool, match, showRecommendation, connect, skip } from '../../api/matching';
import * as setProfile from "../../api/setProfile";

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();



export function HomePage({navigation}) {

  const genderData = [
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
    { label: 'Others', value: 'Others' },
  ];

  const [gender, setGender] = useState("");

  const handleSetGender = () => {
    setProfile.setGender(
      { gender },
      () => console.log("set gender filter"),
      (error) => Alert.alert('error', (error.message || 'Something went wrong, try again later'))
    )
  }

  const [profileData, setProfileData] = useState(null);
  const [profileData1, setProfileData1] = useState(null);
  const [id1, setId1] = useState("");
  const [render, setRender] = useState(false)

  /**
  const [filterMajor, setFilterMajor] = useState("");
  const [filterGender, setFilterGender] = useState()
  const [filterModule, setFilterModule] = useState("");
  const [filterCountryAndRegion, setFilterCountryAndRegion] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterHobby, setFilterHobby] = useState("");
  const [moduleData, setModuleData] = useState([]);
  */

  const [filter, setFilter] = useState(false);

  const getData0 = async () => {
    onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    })
  }


  const getData = async () => {
    const recommend = await showRecommendation();
    setId1(recommend);
    if (recommend !== null) {
      onSnapshot(doc(db, "NUS/users", "profile", recommend), (doc) => {
        setProfileData1(doc.data());
      })
    }

    console.log("Hello");
  }

  const handleSkip = async () => {
    console.log(profileData.recommend.length);
    await skip(profileData.recommend, profileData.point);
    setRender(!render);
  }

  const handleConnect = async () => {
    await connect(id1, profileData.recommend, profileData.point);
    setRender(!render);
  }

  useEffect(() => {
    getData();
  }, [render])
  useEffect(() => {
    getData0();
  }, [])

  //const route = useRoute();

  //setFilterGender(route.params || "");
  if (id1 != null) {
    return (
      <ScrollView style={{ paddingBottom: 0, backgroundColor: 'white' }}>
          <View style = {{alignItems: 'flex-end', paddingRight: 15, paddingVertical: 10}}>
            <MaterialCommunityIcons name="tune" size={20} onPress={() => navigation.navigate("Filter")}/>
          </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', paddingTop: 0, paddingHorizontal: 30, paddingBottom: 10 }}>
          <View style={{ borderColor: '#74D8E3', borderWidth: 1.3, width: Dimensions.get('window').width - 60, alignItems: 'center', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            {profileData1 && (
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 200,
                  marginBottom: 6,
                  marginTop: 10
                }}
                source={{ uri: profileData1.photoURL }}
              />
            )}
            <View style={{ alignItems: 'center', marginTop: 0, justifyContent: 'flex-start', }}>
              {profileData1 && (<Text style={{ fontSize: 24, fontWeight: '500', marginTop: 0, }}>{profileData1.name}</Text>)}
            </View>

            <View style={{ alignItems: 'center', marginTop: 0, justifyContent: 'flex-start', }}>
              {profileData1 && (<Text style={{ fontSize: 17, marginTop: -2, marginBottom: 8 }}>{profileData1.bio}</Text>)}
            </View>
          </View>

          <View style={{ borderLeftWidth: 1.3, borderRightWidth: 1.3, borderBottomWidth: 1.3, width: Dimensions.get('window').width - 60, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderColor: '#43ccde', backgroundColor: '#E5F3FD', paddingLeft: 15, paddingVertical: 5 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15, color: 'gray' }}>Gender</Text>
              {profileData1 && (<Text style={{ fontSize: 15, marginTop: 3, marginBottom: 4, paddingLeft: 3 }}>{profileData1.gender}</Text>)}
            </View>
            {profileData1 && profileData1.showCountryAndRegion && <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15, color: 'gray' }}>Country and Region</Text>
              {profileData1 && (<Text style={{ fontSize: 15, marginTop: 3, marginBottom: 4, paddingLeft: 3 }}>{profileData1.countryAndRegion}</Text>)}
            </View>}
            {profileData1 && profileData1.showMajor && <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15, color: 'gray' }}>Major</Text>
              {profileData1 && (<Text style={{ fontSize: 15, marginTop: 3, marginBottom: 4, paddingLeft: 3 }}>{profileData1.major}</Text>)}
            </View>}
            {profileData1 && profileData1.showYear && <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15, color: 'gray' }}>Year</Text>
              {profileData1 && (<Text style={{ fontSize: 15, marginTop: 3, marginBottom: 4, paddingLeft: 3 }}>{profileData1.year}</Text>)}
            </View>}
            {profileData1 && profileData1.showCourse && <View style={{ marginBottom: 10, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 15, color: 'gray' }}>Course</Text>
              {profileData1 && <Text style={{ width: Dimensions.get('window').width - 180, fontSize: 15, marginTop: 3, marginBottom: 4, paddingLeft: 3 }}>{profileData1.course.join(", ")}</Text>}
            </View>}
            {profileData1 && profileData1.showHobby && <View style={{ marginBottom: 10, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 15, color: 'gray' }}>Hobby</Text>
              {profileData1 && <Text style={{ width: Dimensions.get('window').width - 180, fontSize: 15, marginTop: 3, marginBottom: 4, paddingLeft: 3 }}>{profileData1.hobby.join(", ")}</Text>}
            </View>}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 15, paddingBottom: 5, marginHorizontal: 6 }}>
              <TouchableOpacity style={{ height: 55, width: 100, borderColor: '#89CFF0', borderWidth: 0.8, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#74D8E3' }}
                onPress={() => handleSkip()}>
                <Text style={{ color: 'white', fontWeight: '600' }}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ height: 55, width: 100, borderColor: '#89CFF0', borderWidth: 0.8, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#74D8E3' }}
                onPress={() => handleConnect()}>
                <Text style={{ color: 'white', fontWeight: '600' }}>Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  else {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 50, backgroundColor: 'white' }}>
        <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#9fd8f3', fontWeight: '600', paddingHorizontal: 5, fontSize: 18, textAlign: 'center', fontStyle: 'italic' }}>Oops! We've run out of recommendations🙁 </Text>
          <Text style={{ color: '#9fd8f3', fontWeight: '600', paddingHorizontal: 5, fontSize: 18, textAlign: 'center', fontStyle: 'italic' }}>Come back later!</Text>
        </View>
      </View>
    )
  }
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
      onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
        setProfileData(doc.data());
      })
    }

    useEffect(() => {
      getData();
    }, [])

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', paddingTop: 20 }}>
        {profileData && (
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              marginBottom: 10,
            }}
            source={{ uri: profileData.photoURL }}
          />
        )}
        <View style={{
          alignItems: 'center',
          marginTop: 0,
          justifyContent: 'flex-start',
        }}>
          {profileData && (
            <Text style={{
              fontSize: 19,
              fontWeight: 'bold',
              marginTop: 10,
            }}>{profileData.name}</Text>
          )}
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity
        
        style={styles.button}
        activeOpacity={0.75}
        onPress={() => navigation.navigate("Edit")}
        >
        <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.spacer_1} />

        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Name</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.name}</Text>}
        </View>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>

          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Bio</Text>
          {auth.currentUser && profileData && (
            <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
              {profileData.bio}
            </Text>
          )}
        </View>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Gender</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.gender}</Text>}
        </View>
        <View style={{ width: Dimensions.get('window').width - 60, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Major</Text>
          {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.major}</Text>}
        </View>
        <View style={{ width: Dimensions.get('window').width - 60, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Course</Text>
          {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.course.join(", ")}</Text>}
        </View>
        <View style={{ width: Dimensions.get('window').width - 60, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
          <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Hobby</Text>
          {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.hobby.join(", ")}</Text>}
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
              style={{ marginRight: 10 }}
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
              style={{ marginRight: 10 }}
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

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: Dimensions.get("window").width - 200,
    backgroundColor: "#2de0ff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  spacer: {
    height: 20,
  },

   spacer_1: {
    height: 20,
  },

  container_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  mainText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    margin: 10
  },
  usual: {
    color: 'gray',
    fontSize: 16,
    margin: 3,
    left: 12
  },
  list: {
    fontSize: 14
  },
  dropdown: {
    margin: 16,
    marginTop: -8,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: 90,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  textInput: {
    margin: 16,
    marginTop: -8,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width - 32,
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 40,
    width: Dimensions.get('window').width - 50,
    position: 'absolute',
    bottom: 15,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#2de0ff',
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});










