//some parts referenced from Chat GPT and stack overflow

import React, { useState, useEffect, Component } from 'react';
import { Alert, FlatList, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CheckBox, Icon } from '@rneui/themed';
import Stack from '@mui/material/Stack';

import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase/app';
import 'firebase/storage';
import { photoFeatureAPI, lastPostTimestampAPI, likesAPI } from '../../api/photoFeature';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, onSnapshot, Timestamp, serverTimestamp } from "firebase/firestore";



import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';

export default function Forum() {
  const [profileData, setProfileData] = useState(null);
  const [image, setImage] = useState(null);
  const [hasChangedPicture, setHasChangedPicture] = useState(false);
  const [lastPostTimestamp, setLastPostTimestamp] = useState(null);
  const [canPost, setCanPost] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const [friendData, setFriendData] = useState([]);

  const navigation = useNavigation();

  const getData = async () => {
    onSnapshot(doc(db, 'NUS/users', 'profile', auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (profileData) {
      setLikedPosts(profileData.likes || []);
    }
  }, [profileData]);

  const storeLastPostTimestamp = async (timestamp) => {
    try {
      await AsyncStorage.setItem('@lastPostTimestamp', timestamp.toString());
    } catch (error) {
      console.log('Error storing last post timestamp:', error);
    }
  };

  const getLastPostTimestamp = async () => {
    try {
      const timestampString = await AsyncStorage.getItem('@lastPostTimestamp');
      if (timestampString) {
        const timestamp = parseInt(timestampString, 10);
        setLastPostTimestamp(timestamp);
      }
    } catch (error) {
      console.log('Error retrieving last post timestamp:', error);
    }
  };

  useEffect(() => {
    getLastPostTimestamp();
    setCanPost(isWithin24Hours());
  }, [profileData]);

  const isWithin24Hours = () => {
    if (!lastPostTimestamp) {
      return true;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - lastPostTimestamp;
    const hoursPassed = elapsedTime / (1000 * 60 * 60);

    console.log('lastPostTimestamp:', lastPostTimestamp);
    console.log('currentTime:', currentTime);
    console.log('elapsedTime:', elapsedTime);
    console.log('hoursPassed:', hoursPassed);

    return hoursPassed >= 24;
  };

  const takePhoto = async () => {
    let result = await launchCameraAsync({
      mediaTypes: ImagePickerMediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setHasChangedPicture(true);
      setFriendData([]); // Clear friendData when taking a new photo

      const newPostTimestamp = Date.now();
      setLastPostTimestamp(newPostTimestamp);
      await storeLastPostTimestamp(newPostTimestamp);
    }
  };

  const setPhotoFeature = async () => {
    if (hasChangedPicture) {
      if (isWithin24Hours()) {
        const newPostTimestamp = Date.now();
        setLastPostTimestamp(newPostTimestamp);

        photoFeatureAPI(
          { image },
          async () => {
            console.log('uploaded!');
            lastPostTimestampAPI(
              () => {
                likesAPI(
                  () => {
                    setShowFriendsPosts(true);
                    setCanPost(false);
                  },
                  (error) => {
                    console.log('Error liking post:', error);
                  }
                );
              },
              (error) =>
                Alert.alert(
                  'Error',
                  error.message || 'Something went wrong, try again later'
                )
            );
          },
          (error) =>
            Alert.alert(
              'Error',
              error.message || 'Something went wrong, try again later'
            )
        );
      } else {
        Alert.alert('Error', 'You can only post a photo once every 24 hours.');
      }
    } else {
      Alert.alert('Warning', 'Please take a photo');
    }
  };

  const fetchFriendsPosts = async () => {
    if (profileData && profileData.friend) {
      const formattedFriend = profileData.friend.map(async (uid) => {
        const friendDocRef = doc(db, 'NUS/users', 'Forum', uid);
        const friendDocSnap = await getDoc(friendDocRef);
        const friendData = friendDocSnap.data();

        const friendProfileDocRef = doc(db, 'NUS/users', 'profile', uid);
        const friendProfileDocSnap = await getDoc(friendProfileDocRef);
        const friendProfileData = friendProfileDocSnap.data();

        if (friendData && friendProfileData && friendData.photoFeatureURL) {
          return {
            friendUid: uid,
            photoFeatureURL: friendData.photoFeatureURL,
            name: friendProfileData.name,
            profilePicture: friendProfileData.photoURL,
            lastPostTimestamp: friendData.lastPostTimestamp,
          };
        } else {
          return null;
        }
      });

      Promise.all(formattedFriend).then((formattedData) => {
        const filteredData = formattedData.filter((item) => item !== null);
        setFriendData(filteredData);
        console.log(filteredData);
      });
    }
  };

  useEffect(() => {
    if (!canPost) {
      fetchFriendsPosts();
    }
  }, [canPost]);


  const handleLike = async (item) => {
  try {
    const friendUid = item.friendUid;

    const friendDocRef = doc(db, 'NUS/users', 'Forum', friendUid);
    const friendDocSnap = await getDoc(friendDocRef);
    const friendData = friendDocSnap.data();

    let updatedLikes = [];

    if (friendData && friendData.likes) {
      if (friendData.likes.includes(auth.currentUser.uid)) {
        // Unlike the post
        updatedLikes = friendData.likes.filter((id) => id !== auth.currentUser.uid);
      } else {
        // Like the post
        updatedLikes = [...friendData.likes, auth.currentUser.uid];
      }

      // Update the document in Firestore with the updatedLikes array
      await updateDoc(friendDocRef, {
        likes: updatedLikes,
      });

      // Update the likedPosts state with the updatedLikes array
      setLikedPosts(updatedLikes);
    }
  } catch (error) {
    console.log('Error liking post:', error);
  }
};


  const renderFriendPost = ({ item }) => {
  const isPostLiked = item.likes && item.likes.includes(auth.currentUser.uid);

  const postTime = item.lastPostTimestamp
    ? item.lastPostTimestamp.toDate().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
    : '';

  return (
    <View style={styles.postContainer}>
      <View style={styles.friendInfoContainer}>
        <Image
          style={styles.friendProfilePicture}
          source={{ uri: item.profilePicture }}
        />
        <Text style={styles.friendName}>{item.name}</Text>
      </View>
      <Image style={styles.postImage} source={{ uri: item.photoFeatureURL }} />
      <View style={styles.postButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.likeButton,
            { backgroundColor: isPostLiked ? '#2de0ff' : 'grey' },
          ]}
          onPress={() => {
            console.log('Like button pressed');
            handleLike(item);
          }}
        >
          <AntDesign name="like1" size={20} color="white" />
        </TouchableOpacity>
        <Text style={[styles.postTime, styles.buttonSpacing]}>{postTime}</Text>
      </View>
    </View>
  );
};



  return (
    <View style={styles.container}>
      {!canPost ? (
        <View style={styles.friendsPostsContainer}>
          <Text style={styles.friendsPostsText}>Friends' Posts</Text>
          <View style={styles.postsContainer}>
            <FlatList
              data={friendData}
              renderItem={renderFriendPost}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      ) : (
        <>
          {!image && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You have not taken a photo for today.
                Please take a photo to see your friends' photos.
              </Text>
              <TouchableOpacity style={styles.selectButton} onPress={takePhoto}>
                <Text style={styles.buttonText}>
                  {hasChangedPicture
                    ? 'Retake Photo; Open Camera'
                    : 'Open Camera'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {image && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={[styles.uploadButton, !hasChangedPicture && styles.disabledButton]}
                onPress={setPhotoFeature}
                disabled={!hasChangedPicture}
              >
                <Text style={styles.buttonText}>Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#2de0ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems:'center',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  emptyContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#2de0ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  spacer: {
    height: 20,
  },
  friendsPostsContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  friendsPostsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
  },
  postContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 450, 
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: '#FAF9F6',
  },
  friendInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  friendProfilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  postImage: {
    width: '100%',
    height: '70%', 
    borderRadius: 10,
  },
  postButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
   postButton: {
    backgroundColor: '#2de0ff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonSpacing: {
    marginLeft: 120,
  },

  likeButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
}); 