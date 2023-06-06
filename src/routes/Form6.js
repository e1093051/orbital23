import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CheckBox } from '@rneui/themed';
import { ScrollView } from 'react-native';


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

  const [hobby, setHobby] = useState("");
  const [checked, setChecked] = React.useState(true);
  const navigation = useNavigation();

  const MultiSelectComponent = () => {
  const [selected, setSelected] = useState([]);
  };

   const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  return (
     <View style={styles.container_1}>
      <View style={styles.container}>
        <Text style={styles.mainText}>What are your hobbies?</Text>
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
              placeholder=" "
              value={hobby}
              search
              searchPlaceholder="Search..."
              onChange={item => {
                setHobby(item);
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
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          center
          title="Show my hobbies to others"
          checked={checked}
          onPress={() => setChecked(!checked)}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={'checkbox-blank-outline'}
          titleProps={styles.checkbox}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Form7')} >
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
    color: 'white'
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
  checkBoxContainer: {
    position: 'absolute',
    bottom: 60,
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
  next: {
    color: 'white',
    fontWeight: 'bold',
  },

});