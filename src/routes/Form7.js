import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import { CheckBox } from '@rneui/themed';




import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import * as setProfile from "../../api/setProfile";


export default () => {

  const yearData = [

  { label: 'Year 1', value: 1 },
  { label: 'Year 2', value: 2 },
  { label: 'Year 3', value: 3 },
  { label: 'Year 4', value: 4 },
  { label: 'Year 5', value: 5 },
  { label: 'Year 6', value: 6 },
];

  const [year, setYear] = useState("");
  const [checked, setChecked] = React.useState(true);
  const navigation = useNavigation();

  const handleSetYear = () => {
    if (year !== "") {
      setProfile.setYear(
        { year, showYear: checked },
        () => navigation.navigate('Home'),
        (error) => Alert.alert('Error', error.message || 'Something went wrong, try again later')
      );
    } else {
      Alert.alert('Warning', 'Please select a major before proceeding');
    }
  }

  return (
    <View style={styles.container_1}>
      <View style={styles.container}>
        <Text style={styles.mainText}>What's your year?</Text>
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
          onChange={(item) => setYear(item.value)}
          value={year}
          placeholder=" "
          valueField="value"
        />
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          center
          title="Show my year to others"
          checked={checked}
          onPress={() => setChecked(!checked)}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon="checkbox-blank-outline"
          titleProps={styles.checkbox}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        style={[
          styles.buttonContainer,
          { backgroundColor: year !== '' ? '#2de0ff' : '#808080' },
        ]}
        onPress={handleSetYear}
        disabled={year === ''}
      >
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
  },
  next: {
    color: 'white',
    fontWeight: 'bold',
  },
});