import React, { useState, useEffect, useRoute } from 'react';
import { Alert } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
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
import { generateMatchingPool, match, showRecommendation, connect, skip, filter, filterMatch, filterConnect, filterSkip } from '../../api/matching';
import * as setProfile from "../../api/setProfile";

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();



export function HomePage({ navigation, route }) {

  const [filterMajor, setFilterMajor] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterModule, setFilterModule] = useState("");
  const [filterCountryAndRegion, setFilterCountryAndRegion] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterHobby, setFilterHobby] = useState("");
  const [render, setRender] = useState(false)




  //reference to chatGPT and StackOverflow: https://stackoverflow.com/questions/44223727/react-navigation-goback-and-update-parent-state
  const updateVariables = (updatedVariables) => {
    setFilterGender(updatedVariables.updatedVariable1);
    setFilterMajor(updatedVariables.updatedVariable2);
    setFilterModule(updatedVariables.updatedVariable3);
    setFilterCountryAndRegion(updatedVariables.updatedVariable4)
    setFilterYear(updatedVariables.updatedVariable5);
    setFilterHobby(updatedVariables.updatedVariable6);
  };

  console.log(filterHobby)


  const onPress = () => {
    navigation.navigate("Filter", { updateVariables, filterGender, filterMajor, filterModule, filterCountryAndRegion, filterYear, filterHobby });
  }

  const [profileData, setProfileData] = useState(null);
  const [profileData1, setProfileData1] = useState(null);
  const [id1, setId1] = useState("");
  console.log("hello");

  const getData0 = async () => {
    onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    })
  }


  const getData = async () => {
    if (filterGender == "" && filterMajor == "" && filterModule == "" && filterCountryAndRegion == "" && filterYear == "" && filterHobby == "") {
      const recommend = await showRecommendation();
      setId1(recommend);
      if (recommend !== null) {
        onSnapshot(doc(db, "NUS/users", "profile", recommend), (doc) => {
          setProfileData1(doc.data());
        })
      }
      console.log("Hello");
    }
    else {
      const recommend = await filterMatch(filterGender, filterMajor, filterModule, filterCountryAndRegion, filterYear, filterHobby);
      setId1(recommend);
      console.log("recommend");
      console.log(id1);
      if (recommend !== null) {
        onSnapshot(doc(db, "NUS/users", "profile", recommend), (doc) => {
          setProfileData1(doc.data());
        })
        console.log("id");
        console.log(id1)
      }
    }
  }

  const handleSkip = async () => {
    if (filterGender == "" && filterMajor == "" && filterModule == "" && filterCountryAndRegion == "" && filterYear == "" && filterHobby == "") {
      console.log(profileData.recommend.length);
      await skip(id1, profileData.recommend, profileData.point);
    }
    else {
      await filterSkip(id1);
    }
    setRender(!render);
  }

  const handleConnect = async () => {
    if (filterGender == "" && filterMajor == "" && filterModule == "" && filterCountryAndRegion == "" && filterYear == "" && filterHobby == "") {
      await connect(id1, profileData.recommend, profileData.point, profileData);
    }
    else {
      await filterConnect(id1, profileData);
    }
    setRender(!render);
  }

  useEffect(() => {
    getData();
  }, [render, filterGender, filterMajor, filterModule, filterCountryAndRegion, filterYear, filterHobby])
  useEffect(() => {
    getData0();
  }, [])


  if (id1 != null) {
    return (
      <ScrollView style={{ paddingBottom: 0, backgroundColor: 'white' }}>
        <View style={{ alignItems: 'flex-end', paddingRight: 15, paddingVertical: 10 }}>
          <MaterialCommunityIcons name="tune" size={20} onPress={() => onPress()} />
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
        <View style={{ alignItems: 'flex-end', paddingRight: 15, paddingVertical: 10 }}>
          <MaterialCommunityIcons name="tune" size={20} onPress={() => onPress()} />
        </View>
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


export default function Home(route) {

  const ProfilePage = () => {

    const navigation = useNavigation();

    const [profileData, setProfileData] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const [friend, setFriend] = useState([]);

    const getData = () => {
      onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
        setProfileData(doc.data());
      })
    }

    const processData = async () => {
      if (profileData && profileData.friend) {
        let friend = [];
        if (profileData.friend.length > 6) {
          for (let i = 0; i < 6; i++) {
            friend[i] = profileData.friend[i];
          }
        }
        else {
          friend = profileData.friend;
        }
        const formattedFriend = friend.map(async (uid) => {
          const friendDocRef = doc(db, "NUS/users", "profile", uid);
          const friendDocSnap = await getDoc(friendDocRef);
          const friendData = friendDocSnap.data();
          return { name: friendData.name, photoURL: friendData.photoURL, uid: uid };

        });
        Promise.all(formattedFriend).then((formattedData) => {
          setFriendList(formattedData);
          console.log(formattedData);
        });
      }
    };

    useEffect(() => {
      getData();
    }, [])

    useEffect(() => {
      processData();
    }, [profileData])

    useEffect(() => {
      if (profileData) {
        setFriend(profileData.friend)
      }
    }, [profileData]);

    return (
      <View style = {{backgroundColor: 'white'}}>
      <ScrollView>
      <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'white', paddingTop: 20 }}>
        <View style={{ alignItems: 'center' }}>
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
                marginTop: 0,
              }}>{profileData.name}</Text>
            )}
          </View>

          <View style={styles.spacer} />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.75}
            onPress={() => navigation.navigate("EditPhoto")}
          >
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <Text style={{ paddingLeft: 8, fontSize: 15.5, color: '#b9b9b9' }}>Friends</Text>
          <TouchableOpacity style={{ paddingRight: 8 }} onPress={() => navigation.navigate("Friends", {friend})}>
            <Text style={{ fontSize: 13 }}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingLeft: 12, flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>
          {profileData && <Text>{profileData.friend.length}</Text>}
          <Text> Friends</Text>
        </View>
        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        {profileData && profileData.friend.length > 0 && <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: 5}}>
        {profileData && profileData.friend.length > 0 && <View style = {{paddingRight: 5}}>
        <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[0].uid})}>
              {friendList[0] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[0].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[0] && <Text style={{ }}>{friendList[0].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
            {profileData && profileData.friend.length > 1 && <View style = {{paddingRight: 5}}>
            <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[1].uid})}>
              {friendList[1] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[1].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[1] && <Text style={{ }}>{friendList[1].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
            {profileData && profileData.friend.length > 2 && <View>
              <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[2].uid})}>
              {friendList[2] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[2].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[2] && <Text style={{ }}>{friendList[2].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
          </View>}
          {profileData && profileData.friend.length > 3 && <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 5}}>
          {profileData && profileData.friend.length > 3 && <View style = {{paddingRight: 5}}>
          <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[3].uid})}>
              {friendList[3] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[3].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[3] && <Text style={{ }}>{friendList[3].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
            {profileData && profileData.friend.length > 4 && <View style = {{paddingRight: 5}}>
            <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[4].uid})}>
              {friendList[4] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[4].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[4] && <Text style={{ }}>{friendList[4].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
            {profileData && profileData.friend.length > 5 && <View>
              <TouchableOpacity onPress={() => navigation.navigate("FriendProfile", {uid: friendList[5].uid})}>
              {friendList[5] && (
                <Image
                  style={{
                    width: (Dimensions.get('window').width - 50) / 3,
                    height: (Dimensions.get('window').width - 50) / 3,
                  }}
                  source={{ uri: friendList[5].photoURL }}
                />
              )}
              <View style={{ alignItems: 'center' }}>
                {friendList[5] && <Text style={{ }}>{friendList[5].name}</Text>}
              </View>
              </TouchableOpacity>
            </View>}
          </View>}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={{ paddingLeft: 8, fontSize: 15.5, color: '#b9b9b9' }}>Personal Information</Text>
          <TouchableOpacity style={{ paddingRight: 8 }} onPress={() => navigation.navigate("Edit")}>
            <Text style={{ fontSize: 13 }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', paddingTop: 5 }}>
          <View style={{ width: Dimensions.get('window').width - 30, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Name</Text>
            {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.name}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>

            <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Bio</Text>
            {auth.currentUser && profileData && (
              <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>
                {profileData.bio}
              </Text>
            )}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Gender</Text>
            {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.gender}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, borderBottomWidth: 1, flexDirection: "row", borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, marginBottom: 5, marginTop: 5 }}>Major</Text>
            {profileData && <Text style={{ color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.major}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Course</Text>
            {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.course.join(", ")}</Text>}
          </View>
          <View style={{ width: Dimensions.get('window').width - 30, flexDirection: "row", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', borderBottomColor: '#DEDEDE' }}>
            <Text style={{ width: 80, justifyContent: 'flex-start', verticalAlign: 'middle' }}>Hobby</Text>
            {profileData && <Text style={{ width: Dimensions.get('window').width - 180, color: '#808080', marginBottom: 5, marginTop: 5 }}>{profileData.hobby.join(", ")}</Text>}
          </View>
        </View>
      </View>
      <View style = {{height: 20}}>
      </View>
      </ScrollView>
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
    width: Dimensions.get("window").width - 60,
    backgroundColor: '#e5e5e5',
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#c7c7c7'
  },
  buttonText: {
    fontSize: 14,
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










