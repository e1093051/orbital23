import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, Dimensions, TouchableOpacity} from 'react-native';
import { query, collection, orderBy, limit, getDocs, onSnapshot, doc, getDoc, subcollection } from 'firebase/firestore';
import { db } from '../../api/fireConfig';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default () => {
  const route = useRoute();
  const { id } = route.params;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const commentsQuery = query(
      collection(db, 'NUS', 'studybuddy', 'post', id, 'comment'),
      orderBy('timestamp')
    );

    const commentsSnapshot = await getDocs(commentsQuery);
    const commentsData = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setComments(commentsData);
  };

  const renderCommentItem = ({ item }) => (
    <View key = {item.id}>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View>
      <Text>Comments:</Text>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}