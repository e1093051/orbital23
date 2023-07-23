import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CheckBox } from '@rneui/themed';


import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';

import * as setProfile from "../../api/setProfile";

export default () => {
  const navigation = useNavigation();
  const [module, setModule] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [checked, setChecked] = useState(true);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

  const handleSetCourse = () => {
    if (module.length === 0) {
      Alert.alert('Warning', 'Please select at least one course before proceeding');
      return;
    }
  
    setProfile.setCourse(
      { course: module, showCourse: checked },
      () => navigation.navigate('Form5'),
      (error) => Alert.alert('error', (error.message || 'Something went wrong, try again later'))
    );
  };

  const getData = () => {
    fetch('https://api.nusmods.com/v2/2022-2023/moduleList.json')
      .then((response) => response.json())
      .then((json) => {
        const data = json.map((module) => ({ label: module.moduleCode + " " + module.title, value: module.moduleCode }));
        setModuleData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container_1}>
      <View style={styles.container}>
        <Text style={styles.mainText}>Which courses are you taking?</Text>
        <ScrollView style={{ marginBottom: 115 }} contentInset={{ bottom: 10 }}>
          <Text style={styles.usual}>Course</Text>
          <View style={{ marginLeft: 16 }}>
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
              onChange={(item) => {
                setModule(item);
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
          title="Show my courses to others"
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
        style={[
          styles.buttonContainer,
          { backgroundColor: module.length > 0 ? '#2de0ff' : '#808080' },
        ]}
        onPress={handleSetCourse}
        disabled={module.length === 0}
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