import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


import * as ImagePicker from 'expo-image-picker';

import * as Authentication from "../../api/auth";
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";


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
import { updatePhoto } from '../../api/setProfile';
import { db, auth } from '../../api/fireConfig';


export default () => {
  
  const navigation = useNavigation();

  const [hasChangedPicture, setHasChangedPicture] = useState(false);

  const [image, setImage] = useState(null);

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
  if (profileData) {
    setPhoto(profileData.photo);
  }
}, [profileData]);


  const setProfilePicture = () => {
    if (hasChangedPicture) {
      Authentication.setProfilePicture(
        { image },
        async() => {
          await updateDoc(doc(db, "NUS", "users", "profile",`${auth.currentUser.uid}`), {
            photoURL: image,
          });
          navigation.navigate('Edit')},
        (error) => Alert.alert('error', (error.message || 'Something went wrong, try again later'))
      )
    }
    else {
      Authentication.setDefaultProfilePicture(
        () => navigation.navigate('Edit'),
        (error) => Alert.alert('error', (error.message || 'Something went wrong, try again later'))
      )
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setHasChangedPicture(true);
    }
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.container}>
        <Text style={styles.mainText}>Change your profile picture</Text>
        <Text style={styles.usual}>Share a picture that best represents you! </Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage} style={[styles.circle, { marginTop: -300 }]} activityOpacity={0.8}>
          <Image
            source={image ? { uri: image } : { uri: profileData.photoURL }}

            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImage} style={styles.changeImageContainer}>
          <Text style={styles.changeImageText}>

            {hasChangedPicture ? "Change profile picture" : "Add profile picture"}

          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.buttonContainer}
        onPress={() => setProfilePicture()}>
        <Text style={styles.registerText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  mainText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    margin: 10
  },
  usual: {
    color: 'black',
    fontSize: 14,
    margin: 10,
    marginTop: -5
  },
  signUpButton: {
    height: 40,
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#2de0ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    margin: 0
  },
  signUpText: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: 40,
    width: Dimensions.get('window').width - 20,
    position: 'absolute',
    bottom: 15,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#2de0ff',
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle: {

    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  placeholder: {

    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',

  },

  changeImageContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  changeImageText: {
    color: '#2de0ff',
    fontSize: 16,
  },

});
