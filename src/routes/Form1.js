import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


import * as ImagePicker from 'expo-image-picker';


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

    const [bio, setBio] = useState("");
  
    const navigation = useNavigation();
  
    const handleNext = () => {
      navigation.navigate('Register2', { name })
    }
  
    return (
      <View style={styles.container_1}>
      <View style={styles.container}>
      <Text style = {styles.mainText}>Introduce yourself</Text>
        <Text style={styles.usual}>Bio</Text>
        <TextInput
          style={styles.textInput}
          value={bio}
          onChangeText={setBio}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Form2')} >
        <Text style={styles.registerText}>Next</Text>
      </TouchableOpacity>
    </View>
    );
  }
  
  const styles = StyleSheet.create({

    container_1:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bigContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
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
      margin: 10
    },
    usual: {
      color: 'gray',
      fontSize: 16,
      margin: 3,
      left: 12
    },
    list: {
      fontSize: 14
    },
    dropdown: {
      margin: 16,
      marginTop: -8,
      height: 50,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      width: Dimensions.get('window').width - 32,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
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
    buttomContainer: {
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
  });


