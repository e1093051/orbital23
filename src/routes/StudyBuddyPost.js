import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { collectionGroup, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db } from '../../api/fireConfig';
import { useRoute } from '@react-navigation/native';

export default function PostComments() {
  const [comments, setComments] = useState([]);
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const commentsQuery = query(
      collectionGroup(db,'comment'),
      where('postId', '==', id),
      orderBy('timestamp')
    );

    const commentsSnapshot = await getDocs(commentsQuery);
    const commentsData = commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setComments(commentsData);
  };

  const renderCommentItem = ({ item }) => (
    <View key={item.id}>
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
