import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

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

  const navigation = useNavigation();

  const [gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [module, setModule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.nusmods.com/v2/2022-2023/moduleList.json')
      .then((response) => response.json())
      .then((responseJson) => {

        const moduleData = responseJson.map((module) => ({ label: module.moduleCode }));
        setModule(moduleData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const genderData = [
    { label: 'Female'},
    { label: 'Male'},
    { label: 'Others'},
  ]

  const majorData = [
      { label: 'Pharmacy' },
      { label: 'Nursing' },
      { label: 'Medicine' },
      { label: 'Architecture' },
      { label: 'Industrial Design' },
      { label: 'Landscape Architecture' },
      { label: 'Engineering' },
      { label: 'Biomedical Engineering' },
      { label: 'Chemical Engineering' },
      { label: 'Civil Engineering' },
      { label: 'Electrical Engineering' },
      { label: 'Engineering Science' },
      { label: 'Environmental Engineering' },
      { label: 'Industrial Design' },
      { label: 'Industrial & Systems Engineering' },
      { label: 'Infrastructure & Project Management' },
      { label: 'Material Science & Engineering' },
      { label: 'Mechanical Engineering' },
      { label: 'Dentistry' },
      { label: 'Business Analytics' },
      { label: 'Computer Engineering' },
      { label: 'Computer Science' },
      { label: 'Information Systems' },
      { label: 'Information Security' },
      { label: 'Business Administration (Accounting)' },
      { label: 'Business Administration' },
      { label: 'Real Estate' },
      { label: 'Anthropology' },
      { label: 'Chinese Language' },
      { label: 'Chinese Studies' },
      { label: 'Communications and New Media' },
      { label: 'Economics' },
      { label: 'English Language' },
      { label: 'English Literature' },
      { label: 'Geography' },
      { label: 'Global Studies' },
      { label: 'History' },
      { label: 'Japanese Studies' },
      { label: 'Malay Studies' },
      { label: 'Philosophy' },
      { label: 'Political Science' },
      { label: 'Psychology' },
      { label: 'Social Work' },
      { label: 'Sociology' },
      { label: 'South Asian Studies' },
      { label: 'Southeast Asian Studies' },
      { label: 'Theatre Studies' },
      { label: 'Chemistry' },
      { label: 'Data Science and Analytics' },
      { label: 'Life Sciences' },
      { label: 'Mathematics' },
      { label: 'Physics' },
      { label: 'Quantitative Finance' },
      { label: 'Statistics' },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.usual}>Gender</Text>
      <Dropdown
         style={styles.dropdown}
         placeholderStyle={styles.placeholderStyle}
         selectedTextStyle={styles.selectedTextStyle}
         inputSearchStyle={styles.inputSearchStyle}
         maxHeight={300}
         labelField="label"
        data={genderData}
        onChange={item => setGender(item.label)}
        value={gender}
        placeholder= " "
      />
      <Text style={styles.usual}>Bio</Text>
      <TextInput 
        style = {styles.textInput}
      />
      <Text style={styles.usual}>Major</Text>
      <Dropdown
         style={styles.dropdown}
         placeholderStyle={styles.placeholderStyle}
         selectedTextStyle={styles.selectedTextStyle}
         inputSearchStyle={styles.inputSearchStyle}
         maxHeight={300}
         labelField="label"
        data={majorData}
        onChange={item => setMajor(item.label)}
        value={major}
        placeholder= " "
      />

      <Text style={styles.usual}>Module</Text>
      <Dropdown
         style={styles.dropdown}
         placeholderStyle={styles.placeholderStyle}
         selectedTextStyle={styles.selectedTextStyle}
         inputSearchStyle={styles.inputSearchStyle}
         maxHeight={300}
         labelField="label"
        data={module}
        onChange={item => setModule(item.label)}
        value={module}
        placeholder= " "
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
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
  icon: {
    marginRight: 5,
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
  }
});
