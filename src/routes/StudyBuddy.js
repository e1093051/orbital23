//reference to chatGPT: the most basic part to load 5 posts at a time and show on screen is written by chatGPT

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../api/fireConfig';

export default function StudyBuddy() {
  const [posts, setPosts] = useState([]);
  const [batchSize, setBatchSize] = useState(1);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [batchSize]);

  const fetchPosts = async () => {
    const q = query(
      collection(db, 'NUS', 'studybuddy', 'post'),
      orderBy('timestamp', 'desc'),
      limit(batchSize)
    );
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => doc.data());
    setPosts(postsData);
    setLoadMoreVisible(postsData.length >= batchSize);
  };

  const loadMorePosts = () => {
    setBatchSize((prevBatchSize) => prevBatchSize + 5);
  };

  const renderPostItem = ({ item }) => (
    
    <View>
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
      />
      {loadMoreVisible && (
        <Button title="Load More" onPress={loadMorePosts} />
      )}
    </View>
  );
}

