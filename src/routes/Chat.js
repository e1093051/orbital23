//reference to ChatGPT (Lots of code written by it)
//reference to StackOverflow: https://stackoverflow.com/questions/52805879/re-render-component-when-navigating-the-stack-with-react-navigation

import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';



import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image
} from 'react-native';

import { db, auth } from '../../api/fireConfig';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';


export default function Chat() {
  const [chat, setChat] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [transformedKey, setTransformedKey] = useState("");
  const [transformedValue, setTransformedValue] = useState("");
  const [image, setImage] = useState(null);
  const [render, setRender] = useState(false);
  const navigation = useNavigation();

  const isFocus = useIsFocused();


  const getData = async () => {
    onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    })
  }
  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    loadChat();
  }, [profileData])

  useEffect(() => {
    if (isFocus) {
      loadChat();
    }
  }, [isFocus])


  async function loadChat() {
    if (profileData != null && profileData.chat != null) {
      const chatList = Object.entries(profileData.chat);

      const promises = chatList.map(async ([key, value]) => {
        const keySnapshot = await getDoc(doc(db, 'NUS/users', 'profile', key));
        const valueSnapshot = await getDoc(doc(db, 'NUS/chat', 'chat', value));

        return {
          frinedId: key,
          id: value,
          key: keySnapshot.data(),
          value: valueSnapshot.data()
        };
      });


      const mappedChatList = await Promise.all(promises);


      mappedChatList.sort((a, b) => {
        const timestampA = a.value.timestamp;
        const timestampB = b.value.timestamp;
        return timestampB - timestampA; // Descending order
      });

      setChat(mappedChatList);

    }
  }





  const renderChatItem = ({ item, index }) => {
    if (!item || item.value.count === 0) {
      return;
    }
    else {
      const currentUserUid = auth.currentUser.uid;
      const countMinusCurrentUserValue = item.value.count - item.value[currentUserUid];

      const timestamp = item.value.timestamp.toDate();

      const isSameDay = (date1, date2) =>
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();

      const isSameYear = (date1, date2) => date1.getFullYear() === date2.getFullYear();



      // Function to format timestamp
      const formatTimestamp = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (isSameDay(date, today)) {
          // If timestamp is today, show time only
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (isSameDay(date, yesterday)) {
          // If timestamp is yesterday, show "Yesterday"
          return 'Yesterday';
        } else if (isSameYear(date, today)) {
          // If timestamp is this year, show month and day
          return date.toLocaleString('default', { month: 'short', day: 'numeric' });
        } else {
          // Otherwise, show year, month, and day
          return date.toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' });
        }
      };

      const showTimeStamp = formatTimestamp(timestamp);

      return (
        <View>
          <TouchableOpacity onPress={() => { navigation.navigate("ChatPage", { name: item.key.name, id: item.id, friend: item.frinedId, lastMessageTimestamp: item.value.timestamp }) }}
           testID={`chat-item-${item.frinedId}`} >
            <View style={{ borderBottomWidth: 1, width: Dimensions.get('window').width - 4, marginLeft: 1, paddingLeft: 8, paddingRight: 8, flexDirection: 'row', paddingVertical: 6, borderBottomColor: '#e5e5e5', justifyContent: 'space-between', paddingRight: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 200,
                  }}
                  source={{ uri: item.key.photoURL }}
                />
                <View style={{ paddingLeft: 20, paddingTop: 3, flexDirection: 'column' }}>
                  <View>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>{item.key.name}</Text>
                  </View>
                  <View style={{ paddingTop: 3 ,maxWidth: Dimensions.get('window').width - 150}}>
                    <Text>{item.value.lastMessage}</Text>
                  </View>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                <View>
                  <Text style={{ fontSize: 13 }}>{showTimeStamp}</Text>
                </View>
                {countMinusCurrentUserValue != 0 && <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2de0ff', borderRadius: 20, width: 23, height: 23, marginTop: 5 }}>
                  <Text style={{ color: 'white', fontWeight: '600' }}>{countMinusCurrentUserValue}</Text>
                </View>}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };




  return (
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: 'white' }}>
      <FlatList
        data={chat}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        testID="chat-component" // Add testID for the FlatList
      />
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




