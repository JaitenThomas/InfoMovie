import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabBarIcon from './common/TabBarIcon';

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  header
} from 'react-navigation';

import SearchScreen from './screens/SearchScreen';

import MovieScreen from './screens/movie/MovieScreen';
import MovieDetailScreen from './screens/movie/MovieDetailScreen';

import CastDetailScreen from './common/CastDetailScreen';

import TelevisionScreen from './screens/television/TelevisionScreen';
import TelevisionDetailScreen from './screens/television/TelevisionDetailScreen';

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

const bottomTabNavigator = createBottomTabNavigator(
  {
    Movie: {
      screen: MovieScreen,
      navigationOptions: {
        tabBarIcon: TabBarIcon('MaterialCommunityIcon')('movie')(25)
      }
    },
    Television: {
      screen: TelevisionScreen,
      navigationOptions: {
        tabBarIcon: TabBarIcon('FontAwesome')('television')(25)
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: TabBarIcon('FontAwesome')('search')(25)
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        headerTitleStyle: {
          color: 'white'
        },
        headerStyle: {
          backgroundColor: '#23272A'
        },
        headerTintColor: 'white'
      };
    },
    tabBarOptions: {
      style: {
        backgroundColor: '#23272A'
      },
      activeTintColor: '#FFFFFF'
    }
  }
);

const Main = createStackNavigator(
  {
    bottomTabNavigator: {
      screen: bottomTabNavigator
    },
    MovieDetailScreen,
    CastDetailScreen,
    TelevisionDetailScreen
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const AppNavigator = createStackNavigator({
  App: Main
});

export default createAppContainer(AppNavigator);
