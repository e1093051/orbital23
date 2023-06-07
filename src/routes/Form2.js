import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';


import * as setProfile from "../../api/setProfile";


import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';


  export default () => {
    const genderData = [
      { label: 'Female', value: 1 },
      { label: 'Male', value: 2 },
      { label: 'Others', value: 3 },
    ];

    const [gender, setGender] = useState("");
  
    const navigation = useNavigation();

    const handleSetGender = () => {
      setProfile.setGender(
        {gender},
        () => navigation.navigate('Form3'),
        (error) => Alert.alert('error',(error.message || 'Something went wrong, try again later'))
      )
    }
  

    return (
      <View style={styles.container_1}>
      <View style={styles.container}>
      <Text style = {styles.mainText}>What's your gender?</Text>
        <Text style={styles.usual}>Gender</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          labelField="label"
          data={genderData}
          onChange={item => setGender(item.value)}
          value={gender}
          placeholder=" "
          valueField="value"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.buttonContainer}
        onPress={() => handleSetGender()} >
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