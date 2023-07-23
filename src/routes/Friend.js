import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CheckBox, Icon } from '@rneui/themed';
import Stack from '@mui/material/Stack';

import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { acceptRequest, skipReqest } from '../../api/matching';


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
  const navigation = useNavigation();
  const route = useRoute();
  const { friend } = route.params;
  const [friendList, setFriendList] = useState([]);


  const processData = async () => {
    if (friend) {
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
    processData();
  }, [])

  const Item = ({ name, photoURL, uid }) => (
    <TouchableOpacity onPress={ () => navigation.navigate("FriendProfile", {uid})}>
    <View style={{ flexDirection: 'row', paddingLeft: 20, width: Dimensions.get('window').width, justifyContent: 'flex-start', alignItems: 'center', borderBottomWidth: 1}}>
      <View style = {{paddingVertical: 8}}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 200,
        }}
        source={{ uri: photoURL }}
      />
      </View>
      <View style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>
        <Text style={{ fontSize: 16}}>{name}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: 'white' }}>
      <FlatList
        data={friendList}
        renderItem={({ item }) => <Item name={item.name} photoURL={item.photoURL} uid={item.uid} />}
      />
    </View>
  )
}




