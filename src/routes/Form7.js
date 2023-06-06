import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox } from '@rneui/themed';




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

  const yearData = [

  { label: 'Year 1', value: 'Year 1' },
  { label: 'Year 2', value: 'Year 2' },
  { label: 'Year 3', value: 'Year 3' },
  { label: 'Year 4', value: 'Year 4' },
  { label: 'Year 5', value: 'Year 5' },
  { label: 'Year 6', value: 'Year 6' },
];

  const [year, setYear] = useState("");
  const [checked, setChecked] = React.useState(true);
  const navigation = useNavigation();

  return (
    <View style={styles.container_1}>
      <View style={styles.container}>
        <Text style={styles.mainText}>Which year are you in? </Text>
        <Text style={styles.usual}>Year</Text>
        <Dropdown
          search
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          labelField="label"
          data={yearData}
          onChange={item => setYear(item.value)}
          value={year}
          placeholder=" "
          valueField="value"
        />
        </View>
        <View style = {styles.checkBoxContainer}>
          <CheckBox
            center
            title="Show my year of study to others"
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
            onPress={() => navigation.navigate('Form8')} >
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
    </View>
  );
}

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