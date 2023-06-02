import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { create } from 'dva-core';
import Router from './src/router';

export default class module_api extends Component{

  constructor(props){

    super(props);
    this.state = {

      isLoading: true,
      dataSource: null,
    }
  }
    
    componentDidMount(){

      try{
        
        fetch('https://api.nusmods.com/v2/2022-2023/moduleList.json')
            .then( (response) => response.json() )
            .then((responseJson) => {

                 this.setState({

                    isLoading: false,
                    dataSource: responseJson,
                });

            })

            .catch (error => {

                console.error(error);
            });

      } catch (error){

        console.error(error);
      }
    }
}