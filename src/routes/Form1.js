import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as setProfile from "../../api/setProfile";


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


export default () => {
  const [bio, setBio] = useState('');
  const navigation = useNavigation();

  const handleSetBio = () => {
    if (bio.trim() !== '') {
      setProfile.setNameAndPhoto();
      setProfile.setBio(
        { bio },
        () => navigation.navigate('Form2'),
        (error) =>
          Alert.alert('Error', error.message || 'Something went wrong, try again later')
      );
    } else {
      Alert.alert('Warning', 'Please enter a bio before proceeding');
    }
  };

  return (
    <View style={styles.container_1}>
      <View style={styles.container}>
        <Text style={styles.mainText}>Introduce yourself</Text>
        <Text style={styles.usual}>Bio</Text>
        <TextInput
          style={styles.textInput}
          value={bio}
          onChangeText={setBio}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        style={[
          styles.buttonContainer,
          { backgroundColor: bio.trim() !== '' ? '#2de0ff' : '#808080' },
        ]}
        onPress={handleSetBio}
        disabled={bio.trim() === ''}
      >
        <Text style={styles.registerText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  mainText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
    margin: 10,
  },
  usual: {
    color: 'gray',
    fontSize: 16,
    margin: 3,
    left: 12,
  },
  textInput: {
    margin: 16,
    marginTop: -8,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    width: Dimensions.get('window').width - 32,
    fontSize: 16,
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
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


