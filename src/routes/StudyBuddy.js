
//reference to chatGPT: the most basic part to load 5 posts at a time and show on screen is written by chatGPT

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, Dimensions, TouchableOpacity} from 'react-native';
import { query, collection, orderBy, limit, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from '../../api/fireConfig';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function StudyBuddy() {
  const navigation = useNavigation();
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
    const postsData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

    // Fetch user data for each post
    const userDataPromises = postsData.map((post) => {
      const userDocRef = doc(db, 'NUS/users', 'profile', post.who);
      return getDoc(userDocRef);
    });

    const userDataSnapshots = await Promise.all(userDataPromises);
    const userData = userDataSnapshots.map((snapshot) => snapshot.data());

    // Combine post data with user data
    const postsWithUserData = postsData.map((post, index) => ({
      ...post,
      userData: userData[index],
    }));

    setPosts(postsWithUserData);
    setLoadMoreVisible(postsWithUserData.length >= batchSize);
  };


  const loadMorePosts = () => {
    setBatchSize((prevBatchSize) => prevBatchSize + 5);
  };

  const renderPostItem = ({ item }) => (
    <View style={{ borderWidth: 1.5, width: Dimensions.get('window').width -4, marginLeft: 1, paddingLeft: 8, marginBottom: 5, paddingRight: 8}}>
      <Text style = {{fontSize: 19, fontWeight: 'bold', paddingVertical: 3, paddingTop: 8}} >{item.title}</Text>
      <View style = {{flexDirection: 'row', paddingVertical: 3}}>
        <Text style = {{fontSize: 15, fontWeight: '500', paddingBottom: 3, paddingRight: 8}}>{item.userData.name}</Text>
        <View style = {{backgroundColor: '#F5F5F5', justifyContent: 'center', borderRadius: 5}}>
        <Text style = {{fontSize: 13}}>{item.course}</Text>
        </View>
      </View>
      <Text>{item.content}</Text>
      <View style = {{paddingTop: 20, paddingBottom: 10}}>
      <TouchableOpacity onPress={() =>  navigation.navigate("StudyBuddyPost", {id: item.id})}>
        <View style = {{borderBottomWidth: 1, width: 80}}>
        <Text style = {{fontSize: 15}}>View Detail</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );

  console.log(posts)
  return (
    <View style = {{flex: 1, backgroundColor: 'white'}}>
      <View style={{ alignItems: 'flex-end', paddingRight: 15, paddingVertical: 10 }}>
          <MaterialCommunityIcons name="tune" size={20} onPress={() => onPress()} />
        </View>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
      />
      {loadMoreVisible && (
        <Button title="Load More" onPress={loadMorePosts} />
      )}
      <View style = {{position: 'absolute', bottom: 15, right: 5}}>
      <Ionicons name="add-circle-sharp" size={35}/>
      </View>
    </View>
  );
}
