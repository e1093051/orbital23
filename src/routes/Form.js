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

  const navigation = useNavigation();

  const [image, setImage] = useState(null);

  const [gender, setGender] = useState("");
  const [major, setMajor] = useState("");
  const [module, setModule] = useState([]);
  const [moduleData, setModuleData] = useState([]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };



  const getData = () => {
    fetch('https://api.nusmods.com/v2/2022-2023/moduleList.json')
    .then((response) => response.json())
    .then((json) => {
      const data = json.map((module) => ({label: module.moduleCode + " " + module.title, value: module.moduleCode}));
      setModuleData(data);
    })
  }


  useEffect(() => {
    getData();
  }, [])


  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const genderData = [
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
    { label: 'Others', value: 'Others' },
  ];


  const majorData = [
    { label: 'Pharmacy', value: 'Pharmacy' },
    { label: 'Nursing', value: 'Nursing' },
    { label: 'Medicine', value: 'Medicine' },
    { label: 'Architecture', value: 'Architecture' },
    { label: 'Computer Engineering', value: 'Computer Engineering' },
    { label: 'Industrial Design', value: 'Industrial Design' },
    { label: 'Landscape Architecture', value: 'Landscape Architecture' },
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Biomedical Engineering', value: 'Biomedical Engineering' },
    { label: 'Chemical Engineering', value: 'Chemical Engineering' },
    { label: 'Civil Engineering', value: 'Civil Engineering' },
    { label: 'Electrical Engineering', value: 'Electrical Engineering' },
    { label: 'Engineering Science', value: 'Engineering Science' },
    { label: 'Environmental Engineering', value: 'Environmental Engineering' },
    { label: 'Industrial & Systems Engineering', value: 'Industrial & Systems Engineering' },
    { label: 'Infrastructure & Project Management', value: 'Infrastructure & Project Management' },
    { label: 'Material Science & Engineering', value: 'Material Science & Engineering' },
    { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
    { label: 'Dentistry', value: 'Dentistry' },
    { label: 'Business Analytics', value: 'Business Analytics' },
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Information Systems', value: 'Information Systems' },
    { label: 'Information Security', value: 'Information Security' },
    { label: 'Business Administration (Accounting)', value: 'Business Administration (Accounting)' },
    { label: 'Business Administration', value: 'Business Administration' },
    { label: 'Real Estate', value: 'Real Estate' },
    { label: 'Anthropology', value: 'Anthropology' },
    { label: 'Chinese Language', value: 'Chinese Language' },
    { label: 'Chinese Studies', value: 'Chinese Studies' },
    { label: 'Communications and New Media', value: 'Communications and New Media' },
    { label: 'Economics', value: 'Economics' },
    { label: 'English Language', value: 'English Language' },
    { label: 'English Literature', value: 'English Literature' },
    { label: 'Geography', value: 'Geography' },
    { label: 'Global Studies', value: 'Global Studies' },
    { label: 'History', value: 'History' },
    { label: 'Japanese Studies', value: 'Japanese Studies' },
    { label: 'Malay Studies', value: 'Malay Studies' },
    { label: 'Philosophy', value: 'Philosophy' },
    { label: 'Political Science', value: 'Political Science' },
    { label: 'Psychology', value: 'Psychology' },
    { label: 'Social Work', value: 'Social Work' },
    { label: 'Sociology', value: 'Sociology' },
    { label: 'South Asian Studies', value: 'South Asian Studies' },
    { label: 'Southeast Asian Studies', value: 'Southeast Asian Studies' },
    { label: 'Theatre Studies', value: 'Theatre Studies' },
    { label: 'Chemistry', value: 'Chemistry' },
    { label: 'Data Science and Analytics', value: 'Data Science and Analytics' },
    { label: 'Life Sciences', value: 'Life Sciences' },
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Quantitative Finance', value: 'Quantitative Finance' },
    { label: 'Statistics', value: 'Statistics' },
  ];




  return (
    <View style={styles.bigContainer}>
      <View style={{ alignItems: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} color={'black'}/>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
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
          onChange={item => setGender(item.value)}
          value={gender}
          placeholder=" "
          valueField="value"
        />
        <Text style={styles.usual}>Bio</Text>
        <TextInput
          style={styles.textInput}
        />
        <Text style={styles.usual}>Major</Text>
        <Dropdown
          search
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          labelField="label"
          data={majorData}
          onChange={item => setMajor(item.value)}
          value={major}
          placeholder=" "
          valueField="value"
        />
        <Text style={styles.usual}>Course</Text>
        <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={moduleData}
        labelField="label"
        valueField="value"
        placeholder=" "
        value={module}
        search
        searchPlaceholder="Search..."
        onChange={item => {
          setModule(item);
        }}
        selectedStyle = {{margin: 16}}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color="black" name="delete" size={16} />
            </View>
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});


/** 
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const MultiSelectComponent = () => {
  const [selected, setSelected] = useState([]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={selected}
        search
        searchPlaceholder="Search..."

        onChange={item => {
          setSelected(item);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color="black" name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
*/