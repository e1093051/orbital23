import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CheckBox, Icon } from '@rneui/themed';
import Stack from '@mui/material/Stack';

import { launchCameraAsync, MediaTypeOptions } from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as photoFeatureAPI from "../../api/photoFeature";

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
  const navigation = useNavigation();
  const route = useRoute();

  const [cameraPermission, setCameraPermission] = useState(null);
  const [hasPostedToday, setHasPostedToday] = useState(false);
  const [takenPicture, setTakenPicture] = useState(null);

  useEffect(() => {
    getPermissions();
    checkIfUserHasPostedToday();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!hasPostedToday && !takenPicture) {
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Show the same page if no picture has been posted
        navigation.dispatch(StackActions.replace(route.name));
      }
    });

    return unsubscribe;
  }, [navigation, hasPostedToday, takenPicture]);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    setCameraPermission(status === 'granted');
  };

  const checkIfUserHasPostedToday = () => {
    // Here, you can implement the logic to check if the user has already posted today.
    // For example, you can store a timestamp or a flag in AsyncStorage or a backend database.

    // Set the hasPostedToday state based on the result of the check
    setHasPostedToday(/* Logic to determine if user has posted today */);
  };

  const openCamera = async () => {
    if (!cameraPermission) {
      console.log('Camera permission not granted');
      return;
    }

    const result = await launchCameraAsync({ mediaType: MediaTypeOptions.Images });
    console.log(result);

    if (!result.cancelled) {
      setTakenPicture(result.uri);
    }

    // Once the user posts a photo, update the hasPostedToday state
    setHasPostedToday(true);
  };

  const retakePicture = () => {
    setTakenPicture(null);
    setHasPostedToday(false);
  };

 const postPicture = async () => {
  try {
    await photoFeatureAPI(
      { photo: takenPicture },
      () => {
        console.log('Picture uploaded successfully');
        setHasPostedToday(true);
      },
      (error) => {
        Alert.alert('Error', 'Failed to upload picture. Please try again.'); // Display error message as an alert
        console.error('Error uploading picture:', error);
      }
    );
  } catch (error) {
    Alert.alert('Error', 'Failed to upload picture. Please try again.'); // Display error message as an alert
    console.error('Error uploading picture:', error);
  }
};

  return (
    <View style={styles.container}>
      {!hasPostedToday && !takenPicture && (
        <View style={styles.textContainer}>
          <Text style={styles.infoText}>
            You have not posted a photo for today. Add your photo to see your friends' photos.
          </Text>
        </View>
      )}

      {takenPicture && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: takenPicture }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={retakePicture}>
              <Text style={styles.buttonText}>Retake Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={postPicture}>
              <Text style={styles.buttonText}>Post Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!hasPostedToday && !takenPicture && (
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: 200,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2de0ff',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});