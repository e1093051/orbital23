import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { create } from 'dva-core';
import Router from './src/router';

const app = create();

app.start();
const store = app._store;

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
