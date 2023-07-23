//some parts referenced from Chat GPT and stack overflow

import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';


import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';


import 'firebase/storage';
import { photoFeatureAPI, likePost } from '../../api/photoFeature';


import { db, auth } from '../../api/fireConfig';
import { doc, getDoc, onSnapshot } from "firebase/firestore";



import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function Forum() {

  const [profileData, setProfileData] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [image, setImage] = useState(null);
  const [hasChangedPicture, setHasChangedPicture] = useState(false);
  const [lastPostTimestamp, setLastPostTimestamp] = useState(null);
  const [canPost, setCanPost] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [showFriendsPosts, setShowFriendsPosts] = useState(false);
  const [within24Hrs, setWithin24Hrs] = useState(true);
  const [render, setRender] = useState(false);

  const navigation = useNavigation();

  const getData = async () => {
    onSnapshot(doc(db, 'NUS/users', 'profile', auth.currentUser.uid), (doc) => {
      setProfileData(doc.data());
    });
  };

  const getPhotoData = async () => {
    onSnapshot(doc(db, 'NUS/users', 'Forum', auth.currentUser.uid), (doc) => {
      setPhotoData(doc.data());
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getPhotoData();
  }, [])


  useEffect(() => {
    setWithin24Hrs(isWithin24Hours());
  }, [photoData])

  //第一次登入就設定好檔案

  const isWithin24Hours = () => {
    if (photoData && !photoData.lastPostTimestamp) {
      return false;
    }

    if (photoData !== null) {
      const now = new Date();
      const timestampDate = photoData.lastPostTimestamp.toDate();
      console.log(now);
      console.log(timestampDate)
      const timeDiffInMs = now.getTime() - timestampDate.getTime();
      const hoursDiff = timeDiffInMs / (1000 * 60 * 60);
      console.log(hoursDiff);
      return hoursDiff <= 24;
    }
  };

  const takePhoto = async () => {
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setHasChangedPicture(true);
      setFriendData([]); // Clear friendData when taking a new photo
    }
  };

  const setPhotoFeature = async () => {
    photoFeatureAPI(
      { image },
      async () => {
        console.log('uploaded!');
      },
      (error) =>
        Alert.alert(
          'Error',
          error.message || 'Something went wrong, try again later'
        )
    );
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
            likes: friendData.likes
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
    fetchFriendsPosts();
  }, [photoData, render]);


  const handleLike = async(uid) => {
    await likePost(uid);
  }

  const renderFriendPost = ({ item }) => {
    const isPostLiked = item.likes && item.likes.includes(auth.currentUser.uid);
    console.log(item.likes);


    const isSameDay = (date1, date2) =>
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();

      const isSameYear = (date1, date2) => date1.getFullYear() === date2.getFullYear();

      const formatTimestamp = (date) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (isSameDay(date, today)) {
          // If timestamp is today, show time only
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (isSameDay(date, yesterday)) {
          // If timestamp is yesterday, show "Yesterday"
          return 'Yesterday ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });;
        } else if (isSameYear(date, today)) {
          // If timestamp is this year, show month and day
          return date.toLocaleString('default', { month: 'short', day: 'numeric' });
        } else {
          // Otherwise, show year, month, and day
          return date.toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' });
        }
      };

      const postTime = formatTimestamp(item.lastPostTimestamp.toDate())

    return (
      <View style={styles.postContainer}>
        <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.friendInfoContainer}>
          <Image
            style={styles.friendProfilePicture}
            source={{ uri: item.profilePicture }}
          />
          <Text style={styles.friendName}>{item.name}</Text>
          </View>
          <View style = {{justifyContent: 'flex-end', paddingBottom: 16, paddingRight: 10}}>
          <Text>{postTime}</Text>
          </View>
        </View>
        <Image style={styles.postImage} source={{ uri: item.photoFeatureURL }} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              console.log('Like button pressed');
              handleLike(item.friendUid);
              setRender(!render);
            }}
          >
            {isPostLiked ? <AntDesign name="smile-circle" size={30} color='#2de0ff' /> : <AntDesign name="smileo" size={28} color='#2de0ff' />}
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  if (within24Hrs) {
    return (
      <View style={{flex: 1,justifyContent: 'center',alignItems: 'center', paddingBottom: 80}}>
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
      </View>
    )
  } else {
    if (image === null) {
      return (
        <View style={styles.container}>
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
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
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
        </View>)
    }
  }
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
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  emptyContainer: {
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
    width: Dimensions.get('window').width - 10,
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
    alignItems: 'flex-start',
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