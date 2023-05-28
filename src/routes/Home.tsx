import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';

function Home(): JSX.Element {
  return (
    <View style = {styles.container}>
      <Image 
        style = {{height: 100, width: 100}}
        source = {require('./Logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});

export default Home;
