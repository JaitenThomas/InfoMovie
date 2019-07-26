import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabBarIcon from './common/TabBarIcon';

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  header
} from 'react-navigation';

import SearchScreen from './screens/SearchScreen';

import MovieDetailScreen from './screens/movie/MovieDetailScreen';
import MovieTrendingScreen from './screens/movie/MovieTrendingScreen';
import MovieGenreScreen from './screens/movie/MovieGenreScreen';
import MovieGenreDetailScreen from './screens/movie/MovieGenreDetailScreen';
import MovieMoreScreen from './screens/movie/MovieMoreScreen';

import CastDetailScreen from './common/CastDetailScreen';

import TelevisionScreen from './screens/television/TelevisionScreen';
import TelevisionGenreScreen from './screens/television/TelevisionGenreScreen';
import TelevisionDetailScreen from './screens/television/TelevisionDetailScreen';
import TelevisionGenreDetailScreen from './screens/television/TelevisionGenreDetailScreen';

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

// Top navigation bar for Movie Screen
const movieMaterialTopBarNavigator = createMaterialTopTabNavigator(
  {
    Trending: {
      screen: MovieTrendingScreen
    },
    Genres: {
      screen: MovieGenreScreen
    }
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'white'
      },
      style: {
        backgroundColor: '#23272A'
      }
    }
  }
);

// Top navigation bar for Television Screen
const televisionMaterialTopBarNavigator = createMaterialTopTabNavigator(
  {
    Trending: {
      screen: TelevisionScreen
    },
    Genres: {
      screen: TelevisionGenreScreen
    }
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: 'white'
      },
      style: {
        backgroundColor: '#23272A'
      }
    }
  }
);

const bottomTabNavigator = createBottomTabNavigator(
  {
    Movie: {
      screen: movieMaterialTopBarNavigator,
      navigationOptions: {
        tabBarIcon: TabBarIcon('MaterialCommunityIcon')('movie')(25)
      }
    },
    Television: {
      screen: televisionMaterialTopBarNavigator,
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
    MovieGenreDetailScreen,
    CastDetailScreen,
    TelevisionDetailScreen,
    MovieMoreScreen,
    TelevisionGenreDetailScreen
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
