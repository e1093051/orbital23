import React, { useState, useEffect, Component, Linking } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Button
} from 'react-native';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

import Chat from './Chat';
import Forum from './Forum';
import StudyBuddy, { StudyBuddyPage } from './StudyBuddy';

import { createStackNavigator } from '@react-navigation/stack';
import { db, auth } from '../../api/fireConfig';
import { addDoc, collection, setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import Request from './Request';
import { generateMatchingPool } from '../../api/matching';
import { Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


import {
  setHobby
} from '../../api/setProfile';



export default function EditHobby() {

  const hobbyData = [  
    { label: 'Painting and Drawing', value: 'Painting and Drawing' },
    { label: 'Calligraphy', value: 'Calligraphy' },
    { label: 'Embroidery', value: 'Embroidery' },
    { label: 'Knitting', value: 'Knitting' },
    { label: 'Origami', value: 'Origami' },
    { label: 'Pottery', value: 'Pottery' },
    { label: 'Quilting', value: 'Quilting' },
    { label: 'Sculpting', value: 'Sculpting' },
    { label: 'Soapmaking', value: 'Soapmaking' },
    { label: 'Sports (e.g., Football, Basketball, Tennis)', value: 'Sports (e.g., Football, Basketball, Tennis)' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Martial arts', value: 'Martial arts' },
    { label: 'Rock climbing', value: 'Rock climbing' },
    { label: 'Surfing', value: 'Surfing' },
    { label: 'Table tennis', value: 'Table tennis' },
    { label: 'Dancing', value: 'Dancing' },
    { label: 'Acting', value: 'Acting' },
    { label: 'Stand-up comedy', value: 'Stand-up comedy' },
    { label: 'Magic tricks', value: 'Magic tricks' },
    { label: 'Chess', value: 'Chess' },
    { label: 'Crossword puzzles', value: 'Crossword puzzles' },
    { label: 'Jigsaw puzzles', value: 'Jigsaw puzzles' },
    { label: 'Creative writing', value: 'Creative writing' },
    { label: 'Reading books', value: 'Reading books' },
    { label: 'Video games', value: 'Video games' },
    { label: 'Watching movies and TV shows', value: 'Watching movies and TV shows' },
    { label: 'Board games', value: 'Board games' },
    { label: 'Birdwatching', value: 'Birdwatching' },
    { label: 'Fishing', value: 'Fishing' },
    { label: 'Geocaching', value: 'Geocaching' },
    { label: 'Urban exploration', value: 'Urban exploration' },
    { label: 'Stamp collecting', value: 'Stamp collecting' },
    { label: 'Coin collecting', value: 'Coin collecting' },
    { label: 'Card collecting', value: 'Card collecting' },
    { label: 'Playing musical instruments', value: 'Playing musical instruments' },
    { label: 'Singing', value: 'Singing' },
    { label: 'Songwriting', value: 'Songwriting' },
    { label: 'DJing', value: 'DJing' },
    { label: 'Traveling', value: 'Traveling' },
    { label: 'Camping', value: 'Camping' },
    { label: 'Astronomy', value: 'Astronomy' },
    { label: 'Graphic design', value: 'Graphic design' },
    { label: 'Learning new languages', value: 'Learning new languages' },
    { label: 'Gardening', value: 'Gardening' },
    { label: 'Meditation and Yoga', value: 'Meditation and Yoga' },
    { label: 'Volunteer work', value: 'Volunteer work' }
];
  const route = useRoute();
  const { hobby } = route.params;
  const [editHobby, setEditHobby] = useState(hobby);
  const navigation = useNavigation();
  const handleUpdateHobby = () => {
    setHobby({hobby: editHobby, showHobby: true});
    navigation.navigate('Edit');
  }


  const saveProfile = () => {
    if (editHobby != "") {
      handleUpdateHobby();}
    else {
      Alert.alert('error', 'Hobby cannot be empty');

    }
  };


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Change your hobby</Text>

      <ScrollView style = {{marginBottom: 115}}
          contentInset={{bottom: 10}}>
          <Text style={styles.usual}>Hobby</Text>
          <View style={{ marginLeft: 16 }}>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={hobbyData}
              labelField="label"
              valueField="value"
              placeholder="Select your hobbies "
              value={hobby}
              search
              searchPlaceholder="Search..."
              onChange={item => {
                setEditHobby(item);
              }}
              selectedStyle={{ margin: 16 }}
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
        </ScrollView>

      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.saveButton}
        onPress={saveProfile}
      >
        <Text style={styles.saveText}>Save Major</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    width: Dimensions.get('window').width - 20,
    height: 40,
    marginBottom: 10,
  },
  saveButton: {
    height: 40,
    width: Dimensions.get('window').width - 100,
    backgroundColor: '#2de0ff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left: 1
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
    fontSize: 24.5,
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
    marginLeft: 0,
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
  checkBoxContainer: {
    position: 'absolute',
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSelectedStyle: {
    marginRight: 5,
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
  bottomUsual: {
    color: 'gray',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});