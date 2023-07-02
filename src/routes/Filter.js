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
import { filterMatch } from '../../api/matching';





export default function Filter() {

  const navigation = useNavigation();

  //filterMatch("1", "", "", "", "", "");
  //console.log("I want to die right now")

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

  const genderData = [
    { label: 'Female', value: 'Female' },
    { label: 'Male', value: 'Male' },
    { label: 'Others', value: 'Others' },
  ];

  const countryAndRegionData = [
    { label: 'Afghanistan', value: 'Afghanistan' },
    { label: 'Albania', value: 'Albania' },
    { label: 'Algeria', value: 'Algeria' },
    { label: 'Andorra', value: 'Andorra' },
    { label: 'Angola', value: 'Angola' },
    { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda' },
    { label: 'Argentina', value: 'Argentina' },
    { label: 'Armenia', value: 'Armenia' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Austria', value: 'Austria' },
    { label: 'Azerbaijan', value: 'Azerbaijan' },
    { label: 'Bahamas', value: 'Bahamas' },
    { label: 'Bahrain', value: 'Bahrain' },
    { label: 'Bangladesh', value: 'Bangladesh' },
    { label: 'Barbados', value: 'Barbados' },
    { label: 'Belarus', value: 'Belarus' },
    { label: 'Belgium', value: 'Belgium' },
    { label: 'Belize', value: 'Belize' },
    { label: 'Benin', value: 'Benin' },
    { label: 'Bhutan', value: 'Bhutan' },
    { label: 'Bolivia', value: 'Bolivia' },
    { label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' },
    { label: 'Botswana', value: 'Botswana' },
    { label: 'Brazil', value: 'Brazil' },
    { label: 'Brunei', value: 'Brunei' },
    { label: 'Bulgaria', value: 'Bulgaria' },
    { label: 'Burkina Faso', value: 'Burkina Faso' },
    { label: 'Burundi', value: 'Burundi' },
    { label: 'Cabo Verde', value: 'Cabo Verde' },
    { label: 'Cambodia', value: 'Cambodia' },
    { label: 'Cameroon', value: 'Cameroon' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Central African Republic', value: 'Central African Republic' },
    { label: 'Chad', value: 'Chad' },
    { label: 'Chile', value: 'Chile' },
    { label: 'China', value: 'China' },
    { label: 'Colombia', value: 'Colombia' },
    { label: 'Comoros', value: 'Comoros' },
    { label: 'Congo, Democratic Republic of the', value: 'Congo, Democratic Republic of the' },
    { label: 'Congo, Republic of the', value: 'Congo, Republic of the' },
    { label: 'Costa Rica', value: 'Costa Rica' },
    { label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
    { label: 'Croatia', value: 'Croatia' },
    { label: 'Cuba', value: 'Cuba' },
    { label: 'Cyprus', value: 'Cyprus' },
    { label: 'Czech Republic', value: 'Czech Republic' },
    { label: 'Denmark', value: 'Denmark' },
    { label: 'Djibouti', value: 'Djibouti' },
    { label: 'Dominica', value: 'Dominica' },
    { label: 'Dominican Republic', value: 'Dominican Republic' },
    { label: 'East Timor (Timor-Leste)', value: 'East Timor (Timor-Leste)' },
    { label: 'Ecuador', value: 'Ecuador' },
    { label: 'Egypt', value: 'Egypt' },
    { label: 'El Salvador', value: 'El Salvador' },
    { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
    { label: 'Eritrea', value: 'Eritrea' },
    { label: 'Estonia', value: 'Estonia' },
    { label: 'Eswatini', value: 'Eswatini' },
    { label: 'Ethiopia', value: 'Ethiopia' },
    { label: 'Fiji', value: 'Fiji' },
    { label: 'Finland', value: 'Finland' },
    { label: 'France', value: 'France' },
    { label: 'Gabon', value: 'Gabon' },
    { label: 'Gambia', value: 'Gambia' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Germany', value: 'Germany' },
    { label: 'Ghana', value: 'Ghana' },
    { label: 'Greece', value: 'Greece' },
    { label: 'Grenada', value: 'Grenada' },
    { label: 'Guatemala', value: 'Guatemala' },
    { label: 'Guinea', value: 'Guinea' },
    { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
    { label: 'Guyana', value: 'Guyana' },
    { label: 'Haiti', value: 'Haiti' },
    { label: 'Honduras', value: 'Honduras' },
    { label: 'Hungary', value: 'Hungary' },
    { label: 'Iceland', value: 'Iceland' },
    { label: 'India', value: 'India' },
    { label: 'Indonesia', value: 'Indonesia' },
    { label: 'Iran', value: 'Iran' },
    { label: 'Iraq', value: 'Iraq' },
    { label: 'Ireland', value: 'Ireland' },
    { label: 'Israel', value: 'Israel' },
    { label: 'Italy', value: 'Italy' },
    { label: 'Jamaica', value: 'Jamaica' },
    { label: 'Japan', value: 'Japan' },
    { label: 'Jordan', value: 'Jordan' },
    { label: 'Kazakhstan', value: 'Kazakhstan' },
    { label: 'Kenya', value: 'Kenya' },
    { label: 'Kiribati', value: 'Kiribati' },
    { label: 'Korea, North', value: 'Korea, North' },
    { label: 'Korea, South', value: 'Korea, South' },
    { label: 'Kuwait', value: 'Kuwait' },
    { label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
    { label: 'Laos', value: 'Laos' },
    { label: 'Latvia', value: 'Latvia' },
    { label: 'Lebanon', value: 'Lebanon' },
    { label: 'Lesotho', value: 'Lesotho' },
    { label: 'Liberia', value: 'Liberia' },
    { label: 'Libya', value: 'Libya' },
    { label: 'Liechtenstein', value: 'Liechtenstein' },
    { label: 'Lithuania', value: 'Lithuania' },
    { label: 'Luxembourg', value: 'Luxembourg' },
    { label: 'Madagascar', value: 'Madagascar' },
    { label: 'Malawi', value: 'Malawi' },
    { label: 'Malaysia', value: 'Malaysia' },
    { label: 'Maldives', value: 'Maldives' },
    { label: 'Mali', value: 'Mali' },
    { label: 'Malta', value: 'Malta' },
    { label: 'Marshall Islands', value: 'Marshall Islands' },
    { label: 'Mauritania', value: 'Mauritania' },
    { label: 'Mauritius', value: 'Mauritius' },
    { label: 'Mexico', value: 'Mexico' },
    { label: 'Micronesia', value: 'Micronesia' },
    { label: 'Moldova', value: 'Moldova' },
    { label: 'Monaco', value: 'Monaco' },
    { label: 'Mongolia', value: 'Mongolia' },
    { label: 'Montenegro', value: 'Montenegro' },
    { label: 'Morocco', value: 'Morocco' },
    { label: 'Mozambique', value: 'Mozambique' },
    { label: 'Myanmar (Burma)', value: 'Myanmar (Burma)' },
    { label: 'Namibia', value: 'Namibia' },
    { label: 'Nauru', value: 'Nauru' },
    { label: 'Nepal', value: 'Nepal' },
    { label: 'Netherlands', value: 'Netherlands' },
    { label: 'New Zealand', value: 'New Zealand' },
    { label: 'Nicaragua', value: 'Nicaragua' },
    { label: 'Niger', value: 'Niger' },
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'North Macedonia (formerly Macedonia)', value: 'North Macedonia (formerly Macedonia)' },
    { label: 'Norway', value: 'Norway' },
    { label: 'Oman', value: 'Oman' },
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'Palau', value: 'Palau' },
    { label: 'Panama', value: 'Panama' },
    { label: 'Papua New Guinea', value: 'Papua New Guinea' },
    { label: 'Paraguay', value: 'Paraguay' },
    { label: 'Peru', value: 'Peru' },
    { label: 'Philippines', value: 'Philippines' },
    { label: 'Poland', value: 'Poland' },
    { label: 'Portugal', value: 'Portugal' },
    { label: 'Qatar', value: 'Qatar' },
    { label: 'Romania', value: 'Romania' },
    { label: 'Russia', value: 'Russia' },
    { label: 'Rwanda', value: 'Rwanda' },
    { label: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis' },
    { label: 'Saint Lucia', value: 'Saint Lucia' },
    { label: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines' },
    { label: 'Samoa', value: 'Samoa' },
    { label: 'San Marino', value: 'San Marino' },
    { label: 'Sao Tome and Principe', value: 'Sao Tome and Principe' },
    { label: 'Saudi Arabia', value: 'Saudi Arabia' },
    { label: 'Senegal', value: 'Senegal' },
    { label: 'Serbia', value: 'Serbia' },
    { label: 'Seychelles', value: 'Seychelles' },
    { label: 'Sierra Leone', value: 'Sierra Leone' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Slovakia', value: 'Slovakia' },
    { label: 'Slovenia', value: 'Slovenia' },
    { label: 'Solomon Islands', value: 'Solomon Islands' },
    { label: 'Somalia', value: 'Somalia' },
    { label: 'South Africa', value: 'South Africa' },
    { label: 'South Sudan', value: 'South Sudan' },
    { label: 'Spain', value: 'Spain' },
    { label: 'Sri Lanka', value: 'Sri Lanka' },
    { label: 'Sudan', value: 'Sudan' },
    { label: 'Suriname', value: 'Suriname' },
    { label: 'Sweden', value: 'Sweden' },
    { label: 'Switzerland', value: 'Switzerland' },
    { label: 'Syria', value: 'Syria' },
    { label: 'Taiwan', value: 'Taiwan' },
    { label: 'Tajikistan', value: 'Tajikistan' },
    { label: 'Tanzania', value: 'Tanzania' },
    { label: 'Thailand', value: 'Thailand' },
    { label: 'Togo', value: 'Togo' },
    { label: 'Tonga', value: 'Tonga' },
    { label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
    { label: 'Tunisia', value: 'Tunisia' },
    { label: 'Turkey', value: 'Turkey' },
    { label: 'Turkmenistan', value: 'Turkmenistan' },
    { label: 'Tuvalu', value: 'Tuvalu' },
    { label: 'Uganda', value: 'Uganda' },
    { label: 'Ukraine', value: 'Ukraine' },
    { label: 'United Arab Emirates', value: 'United Arab Emirates' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'United States', value: 'United States' },
    { label: 'Uruguay', value: 'Uruguay' },
    { label: 'Uzbekistan', value: 'Uzbekistan' },
    { label: 'Vanuatu', value: 'Vanuatu' },
    { label: 'Vatican City', value: 'Vatican City' },
    { label: 'Venezuela', value: 'Venezuela' },
    { label: 'Vietnam', value: 'Vietnam' },
    { label: 'Yemen', value: 'Yemen' },
    { label: 'Zambia', value: 'Zambia' },
    { label: 'Zimbabwe', value: 'Zimbabwe' },
  ];

  const yearData = [
    { label: 'Year 1', value: 1 },
    { label: 'Year 2', value: 2 },
    { label: 'Year 3', value: 3 },
    { label: 'Year 4', value: 4 },
    { label: 'Year 5', value: 5 },
    { label: 'Year 6', value: 6 },
  ];

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
  const [filterMajor, setFilterMajor] = useState("");
  const [filterGender, setFilterGender] = useState("")
  const [filterModule, setFilterModule] = useState("");
  const [filterCountryAndRegion, setFilterCountryAndRegion] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterHobby, setFilterHobby] = useState("");
  const [moduleData, setModuleData] = useState([]);

  const getData = () => {
    fetch('https://api.nusmods.com/v2/2022-2023/moduleList.json')
      .then((response) => response.json())
      .then((json) => {
        const data = json.map((module) => ({ label: module.moduleCode + " " + module.title, value: module.moduleCode }));
        setModuleData(data);
      })
  }

  useEffect(() => {
    getData();
  }, [])



  return (
      <View style={{ flex: 1, paddingTop: 10, backgroundColor: 'white', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 16, color: 'gray', alignItems: 'flex-start', marginLeft: -2 }}>Gender</Text>
          <View style={{ alignItems: 'center' }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              data={genderData}
              onChange={item => setFilterGender(item.value)}
              placeholder="Gender"
              valueField="value"
            />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16, color: 'gray', alignItems: 'flex-start', marginLeft: -2 }}>Major</Text>
          <View style={{ alignItems: 'center' }}>
            <Dropdown
              search
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              data={majorData}
              onChange={item => setFilterMajor(item.value)}
              placeholder="Major"
              valueField="value"
            />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16, color: 'gray', alignItems: 'flex-start', marginLeft: -2 }}>Course</Text>
          <View style={{ alignItems: 'center' }}>
            <Dropdown
              search
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              data={moduleData}
              onChange={item => setFilterModule(item.value)}
              placeholder="Module"
              valueField="value"
            />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16, color: 'gray', alignItems: 'flex-start', marginLeft: -2 }}>Country and Region</Text>
          <View style={{ alignItems: 'center' }}>
            <Dropdown
              search
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              data={countryAndRegionData}
              onChange={item => setFilterCountryAndRegion(item.value)}
              placeholder="Country and Region"
              valueField="value"
            />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16, color: 'gray', alignItems: 'flex-start', marginLeft: -2 }}>Year</Text>
          <View style={{ alignItems: 'center' }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              data={yearData}
              onChange={item => setFilterYear(item.value)}
              placeholder="Year"
              valueField="value"
            />
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 16, color: 'gray', alignItems: 'flex-start', marginLeft: -2 }}>Hobby</Text>
          <View style={{ alignItems: 'center' }}>
            <Dropdown
              search
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              maxHeight={300}
              labelField="label"
              data={hobbyData}
              onChange={item => setFilterHobby(item.value)}
              placeholder="Hobby"
              valueField="value"
            />
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 15, alignItems: 'center', }}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.saveButton}
            onPress={console.log("set major filter")}
          >
            <Text style={styles.saveText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
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
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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
});