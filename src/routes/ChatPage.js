import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Image, FlatList } from 'react-native';
import { collection, query, orderBy, where, getDocs, addDoc, doc, getDoc, onSnapshot, limit, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../api/fireConfig';
import { useRoute } from '@react-navigation/native';
import { auth } from '../../api/fireConfig';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';


export const updateMyCountToChatCount = async (id) => {
  const snapshot = await getDoc(doc(db, "NUS", 'chat', 'chat', id));
  const chatDoc = snapshot.data();
  const count = chatDoc.count;
  await updateDoc(doc(db, "NUS", 'chat', 'chat', id), {
    [auth.currentUser.uid]: count
  });
}

export default function ChatPage() {
  const [message, setMessage] = useState([]);
  const [text, setText] = useState("");
  const [shouldRender, setShouldRender] = useState(true);
  const [batchSize, setBatchSize] = useState(30);
  const [latest, setLatest] = useState(true);

  const [earliestDoc, setEarliestDoc] = useState(null);



  const route = useRoute();
  const { name } = route.params;
  const { id } = route.params;
  const { friend } = route.params;
  //const { lastMessageTimestamp } = route.params;
  const [profileData, setProfileData] = useState(null);



  const getData = () => {
    onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    })
  }

  const updateMyCount = async () => {
    const snapshot = await getDoc(doc(db, "NUS", 'chat', 'chat', id));
    const chatDoc = snapshot.data();
    const count = chatDoc.count;
    await updateDoc(doc(db, "NUS", 'chat', 'chat', id), {
      [auth.currentUser.uid]: count
    });
  }

  const updateMyChat = async () => {
    await updateDoc(doc(db, "NUS", 'users', 'profile', auth.currentUser.uid), {
      updateChat: increment(1)
    });
  }

  const updateOthersChat = async () => {
    await updateDoc(doc(db, "NUS", 'users', 'profile', friend), {
      updateChat: increment(1)
    });
  }

  const updateChatCount = async () => {
    await updateDoc(doc(db, "NUS", 'chat', 'chat', id), {
      count: increment(1)
    });
  }

  const updateChatDoc = async (sendText) => {
    await updateDoc(doc(db, "NUS", 'chat', 'chat', id), {
      lastMessage: sendText.text,
      timestamp: sendText.time
    });
  }

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  useEffect(() => {
    getData();
  }, [])


  useEffect(() => {
    fetchText();
  }, [profileData]);


  useEffect(() => {
    updateMyCount();
  }, [profileData])




  const fetchText = async () => {
    const textQuery = query(
      collection(db, 'NUS', 'chat', 'chat', id, 'text'),
      orderBy('time', 'desc')
    );
    const textSnapshot = await getDocs(textQuery);
    const textData = textSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMessage(textData);
  }




  const addText = async () => {
    if (text.trim() === '') return;

    const sendText = {
      text: text,
      time: new Date(),
      who: auth.currentUser.uid,
    };

    try {
      await addDoc(collection(db, 'NUS', 'chat', 'chat', id, 'text'), sendText);
      await updateChatCount();
      //await updateMyCount();
      await updateChatDoc(sendText);
      await updateMyChat();
      await updateOthersChat();
      setText("");
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };



  const renderItem = ({ item }) => {


    const isSameDay = (date1, date2) =>
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();

    const isSameYear = (date1, date2) => date1.getFullYear() === date2.getFullYear();

    const currentDate = item.time.toDate().toLocaleDateString();

    const time = item.time.toDate();

    const formatTimestamp = (date) => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (isSameDay(date, today)) {
        // If timestamp is today, show time only
        return 'Today';
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



    const showTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const showDate = formatTimestamp(time);

    return (
      <View>
        <View style={item.who === auth.currentUser.uid ? styles.sentTime : styles.receivedTime}>
          <View style={item.who === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage}>
            <View style={item.who === auth.currentUser.uid ? styles.sentBox : styles.receivedBox}>
              <Text multiline>{item.text}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'flex-end', paddingBottom: 8, paddingRight: 3, paddingLeft: 3 }}>
            <View style = {{flexDirection: 'row-reverse'}}>
            <Text style={{ fontSize: 10, color: '#b3b3b3' }}>{showTime}</Text>
            <Text style={{ fontSize: 10, color: '#b3b3b3' }}>, </Text>
            <Text style={{ color: '#a0a0a0', fontSize: 10 }}>{showDate}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  };


  return (
    <KeyboardAvoidingView style = {[
      keyboardStatus ? styles.Keyboardshown : styles.KeyboardNotShown,
      Platform.OS === 'ios' ? styles.iosBackground: styles.androidBackground,
    ]} behavior={Platform.OS === 'ios' ? 'padding' : 'height' }> 

      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <FlatList
          data={message}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
        />
        <View style={Platform.OS === 'ios' ? styles.iosInput: styles.androidInput}>
          <View style={Platform.OS === 'ios' ? styles.iosTextInput : styles.androidTextInput}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', maxWidth: Dimensions.get('window').width - 40}}>
                <TextInput
                  editable
                  placeholder={"Say something..."}
                  value={text}
                  onChangeText={(text) => {setText(text)}}
                  multiline={true}
                />
            </View>
            <View style={{ paddingRight: 8 }}>
              <Ionicons name="send" size={20} onPress={() => { addText() }} />
            </View>
          </View>
        </View>
      </View>

    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  sentMessage: {
    alignItems: 'flex-end',
    paddingRight: 5,
    borderWidth: 0,
    marginBottom: 8,
    marginTop: 4
  },
  receivedMessage: {
    alignItems: 'flex-start',
    paddingLeft: 5,
    borderWidth: 0,
    marginBottom: 8,
    marginTop: 4
  },
  sentTime: {
    flexDirection: 'row-reverse'
  },
  receivedTime: {
    flexDirection: 'row'
  },
  sentBox: {
    borderWidth: 1,
    borderColor: '#77c3e6',
    maxWidth: Dimensions.get('window').width / 2 - 10,
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderRadius: 5,
    backgroundColor: '#77c3e6'
  },
  receivedBox: {
    borderWidth: 1,
    maxWidth: Dimensions.get('window').width / 2 - 10,
    paddingVertical: 3,
    paddingHorizontal: 2,
    borderRadius: 5,
  },
  Keyboardshown: {
    flex:1,
    marginBottom: 55,
    backgroundColor: 'white'
  },
  KeyboardNotShown: {
    marginBottom: -15,
    flex:1,
    backgroundColor: 'white'
  },
  iosBackground: {
    backgroundColor: 'white',
     flex: 1,
  },
  androidBackground: {
    backgroundColor: 'white',
     flex: 1,
     paddingBottom: 60
  },
  iosInput: {
    paddingBottom: 30, paddingTop: 5, borderTopWidth: 1, marginTop: 5
  },
  androidInput: {
    paddingBottom: 0, paddingTop: 5, borderTopWidth: 1, marginTop: 5, marginBottom: 0
  },
  iosTextInput: 
    { width: Dimensions.get('window').width - 2, margin: 1, borderRadius: 2, paddingLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, paddingTop: 3 },

  androidTextInput: 
    { width: Dimensions.get('window').width - 2, margin: 1, borderRadius: 2, paddingLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 25, paddingTop: 3 },

});