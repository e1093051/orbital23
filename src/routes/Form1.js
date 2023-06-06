import React, { useState, useEffect, Component } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

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
    const [checked, setChecked] = React.useState(true);
    const navigation = useNavigation();
    
    return (
    <View style={styles.container_1}>
      <View style={styles.container}>
        <Text style={styles.usual}>Bio</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox
          center
          title="Show my bio to others"
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
        onPress={() => navigation.navigate('Form6')}
      >
        <Text style={styles.next}>Next</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container_1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    left: 12,
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
});


