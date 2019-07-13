import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';

import MovieScreen from './screens/MovieScreen';
import TelevisionScreen from './screens/TelevisionScreen';

class App extends Component {
  state = {};
  render() {
    return (
      <View>
        <Text>Hello World</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Movie: MovieScreen,
  Television: TelevisionScreen
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator
  }
});

export default createAppContainer(AppNavigator);
