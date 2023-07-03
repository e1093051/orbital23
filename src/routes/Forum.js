import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setHasChangedPicture(true);
    }
  };


  const setPhotoFeature = () => {
    if (hasChangedPicture) {
      photoFeatureAPI(
        { image },
        () => console.log("uploaded!"),
        (error) =>
          Alert.alert(
            'Error',
            error.message || 'Something went wrong, try again later'
          )
      );
    } else {
      Alert.alert('Warning', 'Please upload a picture');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Select a photo</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
      <Image
            source={image ? { uri: image } : require('./Standard_Profile.png')}
            style={styles.image}
          />
        <TouchableOpacity style={styles.uploadButton} onPress={setPhotoFeature()}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#2de0ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});