import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import SearchScreen from './screens/SearchScreen';

import MovieTopRatedScreen from './screens/movie/MovieTopRatedScreen';
import MovieUpcomingScreen from './screens/movie/MovieUpcomingScreen';
import MoviePopularScreen from './screens/movie/MoviePopularScreen';
import MovieDetailScreen from './screens/movie/MovieDetailScreen';

import CastDetailScreen from './common/CastDetailScreen';

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

const topTabNavigator = createMaterialTopTabNavigator(
  {
    Upcoming: MovieUpcomingScreen,
    Popular: MoviePopularScreen,
    'Top Rated': MovieTopRatedScreen
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      }
    }
  }
);

const bottomTabNavigator = createBottomTabNavigator(
  {
    Search: SearchScreen,
    Movie: topTabNavigator,
    Television: TelevisionScreen
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

const Main = createStackNavigator(
  {
    bottomTabNavigator: {
      screen: bottomTabNavigator
    },
    MovieDetailScreen,
    CastDetailScreen
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
