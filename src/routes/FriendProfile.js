import React, { useState, useEffect } from 'react';
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

import { db, auth } from '../../api/fireConfig';
import { useNavigation, useRoute } from '@react-navigation/native';

import { addDoc, collection, setDoc, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { uid } = route.params;
  const [profileData1, setProfileData1] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const getData1 = async () => {
    onSnapshot(doc(db, "NUS/users", "profile", uid), (doc) => {
      setProfileData1(doc.data());
    })
  }

  const getData = async () => {
    onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    })
  }

  const createNewChatDocument = async () => {
    try {
      const chatCollectionRef = collection(db, 'NUS', 'chat', 'chat');
      const newChatDocRef = await addDoc(chatCollectionRef, {
        count: 0,
        [auth.currentUser.uid]: 0,
        [uid]: 0
      });

      const newChatDocId = newChatDocRef.id;

      return newChatDocId;
    } catch (error) {
      console.error('Error creating new chat document:', error);
      return null; // Return null in case of an error
    }
  };

  const checkIfKeyExistsWithValue = (mapping, key) => {
    // Check if the key exists in the mapping object and its value matches the provided value
    return mapping.hasOwnProperty(key);
  };

  const handleChat = async () => {
    if (profileData) {
      //const search = checkIfKeyExistsWithValue(profileData.chat, uid);
      if (profileData.chat && checkIfKeyExistsWithValue(profileData.chat, uid)) {
        //console.log("Hi")
        const chatId = profileData.chat[uid];
        const snapshot = await getDoc(doc(db, 'NUS/chat', 'chat', chatId));
        const chatDoc = snapshot.data();
        navigation.navigate("ChatPage", { name: profileData1.name, id: chatId, friend: uid })
      }
      else {
        const chatId = await createNewChatDocument();
        await setDoc(doc(db, "NUS", "users", "profile", `${auth.currentUser.uid}`), {
          "chat": {
            [uid]: chatId
          }
        },
          { merge: true });
        await setDoc(doc(db, "NUS", "users", "profile", uid), {
          "chat": {
            [auth.currentUser.uid]: chatId
          }
        },
          { merge: true });
        console.log("Just built a new chat");
        navigation.navigate("ChatPage", { name: profileData1.name, id: chatId, friend: uid }) 
      }
    }
  }



  useEffect(() => {
    getData();
  }, [])


  useEffect(() => {
    getData1();
  }, [])


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', paddingTop: 0, paddingHorizontal: 30, paddingBottom: 10 }}>
        <View style={{ width: Dimensions.get('window').width - 60, alignItems: 'center', }}>
          <View>
            {profileData1 && (
              <Image
                style={{
                  width: Dimensions.get('window').width,
                  height: (Dimensions.get('window').width) * 0.75,
                  marginBottom: 6,
                }}
                source={{ uri: profileData1.photoURL }}
              />
            )}
            <View style={{ position: 'absolute', bottom: 25, left: 10 }}>
              {profileData1 && (<Text style={{ fontSize: 24, fontWeight: '500', color: 'white' }}>{profileData1.name}</Text>)}
            </View>
            <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
              {profileData1 && (<Text style={{ fontSize: 14, color: 'white' }}>{profileData1.bio}</Text>)}
            </View>
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: -6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: '#e5e5e5', width: Dimensions.get('window').width - 60, alignItems: 'center', height: 30, justifyContent: 'center' }} onPress={() => handleChat()}>
            <Text>Chat</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: '#e5e5e5', width: 30, alignItems: 'center', height: 30, justifyContent: 'center' }}>
            <FontAwesome5 color="black" name="user-friends" size={12} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'white', paddingTop: 0, paddingHorizontal: 10, paddingBottom: 10 }}>
        <View style={{ width: Dimensions.get('window').width - 60, paddingVertical: 5, marginLeft: -40 }}>
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
        </View>
      </View>
    </ScrollView>
  );
}