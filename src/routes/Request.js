import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CheckBox, Icon } from '@rneui/themed';
import Stack from '@mui/material/Stack';

import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";


import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Image
} from 'react-native';


export default () => {
  const [profileData, setProfileData] = useState(null);
  const [invite, setInvite] = useState([])

  const getData = async () =>{
    onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    })
  }

  //reference to chatGPT:)
  const processData = async () => {

    if (profileData && profileData.invite) {
      const formattedInvite = profileData.invite.map(async (uid) => {
        const inviteDocRef = doc(db, "NUS/users", "profile", uid);
        const inviteDocSnap = await getDoc(inviteDocRef);
        const inviteData = inviteDocSnap.data();
        return { name: inviteData.name, photoURL: inviteData.photoURL, bio: inviteData.bio };
      });

      Promise.all(formattedInvite).then((formattedData) => {
        setInvite(formattedData);
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




  const Item = ({ name, bio, photoURL }) => (
    <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, justifyContent: 'flex-start', alignItems: 'center', borderBottomWidth: 1 }}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 200,
        }}
        source={{ uri: photoURL }}
      />
      <View style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>{name}</Text>
        <Text style={{ fontSize: 14, paddingTop: 5 }}>{bio}</Text>
      </View>
      <TouchableOpacity style = {{position: 'absolute', right: 75, borderWidth: 0.5, height: 30, width: 55, justifyContent: 'center'}}>
        <Text style = {{textAlign: 'center'}}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {{position: 'absolute', right: 10, borderWidth: 0.5, height: 30, width: 55, justifyContent: 'center'}}>
        <Text style = {{textAlign: 'center'}}>Decline</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: 'white' }}>
      <FlatList
        data={invite}
        renderItem={({ item }) => <Item name={item.name} photoURL={item.photoURL} bio={item.bio} />}
      />
    </View>
  );
}





