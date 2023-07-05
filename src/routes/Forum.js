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

  const navigation = useNavigation();

  const takePhoto = async () => {
    let result = await launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
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
      Alert.alert('Warning', 'Please take a photo');
    }
  };

  return (
    <View style={styles.container}>
      {hasChangedPicture ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
          <TouchableOpacity
            style={[styles.uploadButton, !hasChangedPicture && styles.disabledButton]}
            onPress={setPhotoFeature}
            disabled={!hasChangedPicture}
            //onPress={() => navigation.navigate('Forum2')}
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

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.selectButton} onPress={takePhoto}>
        <Text style={styles.buttonText}>
          {hasChangedPicture ? 'Retake Photo; Open Camera' : 'Open Camera'}
        </Text>
      </TouchableOpacity>
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



});