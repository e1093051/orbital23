import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Image, FlatList } from 'react-native';
import { collection, query, orderBy, where, getDocs, addDoc, doc, getDoc, onSnapshot, limit, increment, updateDoc } from 'firebase/firestore';
import { db } from '../../api/fireConfig';
import { useRoute } from '@react-navigation/native';
import { auth } from '../../api/fireConfig';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ChatPage() {
  const [message, setMessage] = useState([]);
  const [text, setText] = useState('');
  const [shouldRender, setShouldRender] = useState(true);
  const [batchSize, setBatchSize] = useState(30);
  const [latest, setLatest] = useState(true);

  const [earliestDoc, setEarliestDoc] = useState(null);



  const route = useRoute();
  const { image } = route.params;
  const { name } = route.params;
  const { id } = route.params;
  const { firstMessage } = route.params;
  const [profileData, setProfileData] = useState(null);


  const getData0 = () => {onSnapshot(doc(db, 'NUS', 'chat', 'chat', id, 'text', firstMessage), (doc) => {
    setEarliestDoc(doc.data());
  })
}

  const getData = () => {
    onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    })
  }

  const setCount = async() => {
    const snapshot = await getDoc(doc(db, "NUS", 'chat', 'chat', id));
    const chatDoc = snapshot.data();
    const count = chatDoc.count;
    await updateDoc(doc(db, "NUS", 'chat', 'chat', id), {
      [auth.currentUser.uid]: count
    });
  }

  useEffect(() => {
    getData0();
  }, [])

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setCount();
  }, [])
  


  useEffect(() => {
    fetchText();
  }, [profileData]);

  const fetchText = async () => {
    const textQuery = query(
      collection(db, 'NUS', 'chat', 'chat', id, 'text'),
      orderBy('time', 'desc'),
      limit(batchSize)
    );
    const textSnapshot = await getDocs(textQuery);
    const textData = textSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(textData)
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
      await updateDoc(doc(db, "NUS", "users", "profile", auth.currentUser.uid), {
        chatNumber: increment(1)
      });
      setText("");
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };



  let prevDate = null;
  let prevTime = null;


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

    if (prevDate === null) {
      prevDate = currentDate;
      prevTime = time;
    }

    const showTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (item.id === firstMessage) {
      const showCurrentDate = formatTimestamp(item.time.toDate());
      if (currentDate !== prevDate) {
        prevDate = currentDate;
        const showPrevDate = formatTimestamp(prevTime);
        prevTime = time;
        return (
          <View>
            <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <Text style={{ color: '#a0a0a0', fontSize: 13.5 }}>{showCurrentDate}</Text>
            </View>
            <View style={item.who === auth.currentUser.uid ? styles.sentTime : styles.receivedTime}>
              <View style={item.who === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage}>
                <View style={item.who === auth.currentUser.uid ? styles.sentBox : styles.receivedBox}>
                  <Text multiline>{item.text}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={{ paddingHorizontal: 5, fontSize: 10, marginBottom: 6, color: '#b3b3b3' }}>{showTime}</Text>
              </View>
            </View>
            {earliestDoc.time && prevTime && prevTime != earliestDoc.time && <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <Text style={{ color: '#a0a0a0', fontSize: 13.5 }}>{showPrevDate}</Text>
            </View>}
          </View>
        )
      }
      else {
        return (
          <View>
            <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <Text style={{ color: '#a0a0a0', fontSize: 13.5 }}>{showCurrentDate}</Text>
            </View>
            <View style={item.who === auth.currentUser.uid ? styles.sentTime : styles.receivedTime}>
              <View style={item.who === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage}>
                <View style={item.who === auth.currentUser.uid ? styles.sentBox : styles.receivedBox}>
                  <Text multiline>{item.text}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={{ paddingHorizontal: 5, fontSize: 10, marginBottom: 6, color: '#b3b3b3' }}>{showTime}</Text>
              </View>
            </View>
          </View>
        )
      }
    }
    else {
      if (currentDate !== prevDate) {
        prevDate = currentDate;
        const showPrevDate = formatTimestamp(prevTime);
        prevTime = time;
        return (
          <View>
            <View style={item.who === auth.currentUser.uid ? styles.sentTime : styles.receivedTime}>
              <View style={item.who === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage}>
                <View style={item.who === auth.currentUser.uid ? styles.sentBox : styles.receivedBox}>
                  <Text multiline>{item.text}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'flex-end' }}>
                <Text style={{ paddingHorizontal: 5, fontSize: 10, marginBottom: 6, color: '#b3b3b3' }}>{showTime}</Text>
              </View>
            </View>
            {formatTimestamp(earliestDoc.time.toDate()) !== showPrevDate && <View style={{ alignItems: 'center', marginVertical: 8 }}>
              <Text style={{ color: '#a0a0a0', fontSize: 13.5 }}>{showPrevDate}</Text>
            </View>}
          </View>
        )
      }
      else {
        return (
          <View style={item.who === auth.currentUser.uid ? styles.sentTime : styles.receivedTime}>
            <View style={item.who === auth.currentUser.uid ? styles.sentMessage : styles.receivedMessage}>
              <View style={item.who === auth.currentUser.uid ? styles.sentBox : styles.receivedBox}>
                <Text multiline>{item.text}</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <Text style={{ paddingHorizontal: 5, fontSize: 10, marginBottom: 6, color: '#b3b3b3' }}>{showTime}</Text>
            </View>
          </View>
        )
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <FlatList
          nestedScrollEnabled
          data={message}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
        />
        <View style={{ paddingBottom: 10, paddingTop: 5, borderTopWidth: 1, marginTop: 5 }}>
          <View style={{ width: Dimensions.get('window').width - 2, margin: 1, borderRadius: 2, paddingLeft: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 10, paddingTop: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ paddingLeft: 3, maxWidth: Dimensions.get('window').width - 60 }}>
                <TextInput
                  placeholder="Say something..."
                  value={text}
                  onChangeText={setText}
                  multiline={true}
                />
              </View>
            </View>
            <View style={{ paddingRight: 8 }}>
              <Ionicons name="send" size={20} onPress={() => { addText() }} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sentMessage: {
    alignItems: 'flex-end',
    paddingRight: 5,
    borderWidth: 0,
    marginBottom: 5
  },
  receivedMessage: {
    alignItems: 'flex-start',
    paddingLeft: 5,
    borderWidth: 0,
    marginBottom: 5
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
  receivedBox:{
    borderWidth: 1, 
    maxWidth: Dimensions.get('window').width / 2 - 10, 
    paddingVertical: 3, 
    paddingHorizontal: 2, 
    borderRadius: 5, 
  }
});