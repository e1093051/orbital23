//some parts referenced from Chat GPT and stack overflow

import React, { useState, useEffect, Component } from 'react';
import { Alert, FlatList } from 'react-native';
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
import { photoFeatureAPI } from '../../api/photoFeature';

import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc, onSnapshot, Timestamp } from "firebase/firestore";



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
  const [image, setImage] = useState(null);
  const [hasChangedPicture, setHasChangedPicture] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [lastPostTimestamp, setLastPostTimestamp] = useState(null);
  const [lastPostDate, setLastPostDate] = useState(null);
  const [currentPostTimestamp, setCurrentPostTimestamp] = useState(null);
  const [showFriendsPosts, setShowFriendsPosts] = useState(false);
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [friendData, setFriendData] = useState([]);
  const [canPost, setCanPost] = useState(true);

  const getData = async () => {
    onSnapshot(doc(db, "NUS/users", "profile", auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    })
  };

  const getLastPostTimestamp = async () => {
    try {
      if (profileData && profileData.lastPostTimestamp) {
        setLastPostTimestamp(profileData.lastPostTimestamp);
        setLastPostDate(new Date(profileData.lastPostTimestamp));
      }
    } catch (error) {
      console.log('Error retrieving last post timestamp:', error);
    }
  };

  useEffect(() => {
    getLastPostTimestamp();
  }, [profileData]);

  const takePhoto = async () => {
    let result = await launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setHasChangedPicture(true);
      setShowFriendsPosts(false);
    }
  };

  const setPhotoFeature = async () => {
  if (hasChangedPicture) {
    if (isWithin24Hours()) {
      const newPostTimestamp = Date.now(); 
      setCurrentPostTimestamp(newPostTimestamp); 
      
      photoFeatureAPI(
        { image },
        async () => {
          console.log('uploaded!');
          const timestamp = Timestamp.fromMillis(newPostTimestamp); 
          await setDoc(
            doc(db, "NUS", "users", "profile", `${auth.currentUser.uid}`),
            {
              lastPostTimestamp: timestamp
            },
            {
              merge: true
            }
          );
          setShowFriendsPosts(true);
          setCanPost(false); 
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



  const isWithin24Hours = () => {
    if (!profileData || !profileData.lastPostTimestamp) {
      return true;
    }

    setLastPostTimestamp(profileData.lastPostTimestamp);

    const currentTime = Date.now();
    const elapsedTime = currentTime - lastPostTimestamp;
    const hoursPassed = elapsedTime / (1000 * 60 * 60);

    return hoursPassed >= 24;
  };

  const fetchFriendsPosts = async () => {
    if (profileData && profileData.friend) {
      const formattedFriend = profileData.friend.map(async (uid) => {
        const friendDocRef = doc(db, "NUS/users", "profile", uid);
        const friendDocSnap = await getDoc(friendDocRef);
        const friendData = friendDocSnap.data();

        if (friendData.photoFeatureURL) {
          return { photoFeatureURL: friendData.photoFeatureURL, name: friendData.name, profilePicture: friendData.profilePicture };
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
    getData();
  }, []);

 useEffect(() => {
  if (showFriendsPosts) {
    fetchFriendsPosts();
    getLastPostTimestamp(); 
  }
}, [showFriendsPosts]);

const handleLike = (item) => {
    console.log('Like clicked', item);
  };

  const handleComment = (item) => {
    console.log('Comment clicked', item);
  };


  const renderFriendPost = ({ item }) => {
  const postTime = new Date(item.lastPostTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.postContainer}>
      <View style={styles.friendInfoContainer}>
        <Image style={styles.friendProfilePicture} source={{ uri: item.profilePicture }} />
        <Text style={styles.friendName}>{item.name}</Text>
      </View>
      <Image style={styles.postImage} source={{ uri: item.photoFeatureURL }} />
      <View style={styles.postButtonsContainer}>
        <TouchableOpacity style={styles.postButton} onPress={() => handleLike(item)}>
          <AntDesign name="like1" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={() => handleComment(item)}>
          <AntDesign name="message1" size={20} color="white" />
        </TouchableOpacity>
        <Text style={[styles.postTime, styles.buttonSpacing]}>{postTime}</Text>
      </View>
    </View>
  );
};


  return (
<View style={styles.container}>
    {showFriendsPosts && !canPost ? (
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
          {hasChangedPicture ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  !hasChangedPicture && styles.disabledButton,
                ]}
                onPress={setPhotoFeature}
                disabled={!hasChangedPicture}
              >
                <Text style={styles.buttonText}>Post</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You have not taken a photo for today.
                Please take a photo to see your friends' photos.
              </Text>
            </View>
          )}

           {!showFriendsPosts && canPost && (
          <TouchableOpacity style={styles.selectButton} onPress={takePhoto}>
            <Text style={styles.buttonText}>
              {hasChangedPicture ? 'Retake Photo; Open Camera' : 'Open Camera'}
            </Text>
          </TouchableOpacity>
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonSpacing: {
    marginLeft: 120,
  },
}); 