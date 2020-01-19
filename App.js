/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import Header from './src/components/Header'
import Post from './src/components/Post'
export default class App extends Component {
  render() {
    const comments =[{
      nickname:'Joana',
      comment:'excelente foto'
    },{
      nickname:'Rafael',
      comment:'horroroso'
    }]
    return (
      <View style={{flex:1}}>
        <Header/>
        <Post image={require('./assets/imgs/fence.jpg')}
          comments={comments}/>
      </View>
    )
  }
}
