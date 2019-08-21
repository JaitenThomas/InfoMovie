import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabBarIcon from './common/TabBarIcon';

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import SearchScreen from './screens/SearchScreen';

import MovieDetailScreen from './screens/movie/MovieDetailScreen';
import MovieTrendingScreen from './screens/movie/MovieTrendingScreen';
import MovieGenreScreen from './screens/movie/MovieGenreScreen';
import MovieGenreMoreScreen from './screens/movie/MovieGenreMoreScreen';
import MovieMoreScreen from './screens/movie/MovieMoreScreen';

import CastDetailScreen from './common/CastDetailScreen';

import TelevisionTrendingScreen from './screens/television/TelevisionTrendingScreen';
import TelevisionGenreScreen from './screens/television/TelevisionGenreScreen';
import TelevisionDetailScreen from './screens/television/TelevisionDetailScreen';
import TelevisionGenreMoreScreen from './screens/television/TelevisionGenreMoreScreen';
import TelevisionMoreScreen from './screens/television/TelevisionMoreScreen';

import { vmin } from 'react-native-expo-viewport-units';

class App extends Component {
  state = {};
  render() {
    return <View />;
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
      },
      labelStyle: {
        fontSize: vmin(3)
      }
    }
  }
);

// Top navigation bar for Television Screen
const televisionMaterialTopBarNavigator = createMaterialTopTabNavigator(
  {
    Trending: {
      screen: TelevisionTrendingScreen
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
      },
      labelStyle: {
        fontSize: vmin(3)
      }
    }
  }
);

const bottomTabNavigator = createBottomTabNavigator(
  {
    Movie: {
      screen: movieMaterialTopBarNavigator,
      navigationOptions: {
        tabBarIcon: TabBarIcon('MaterialCommunityIcon')('movie')(vmin(6))
      }
    },
    Television: {
      screen: televisionMaterialTopBarNavigator,
      navigationOptions: {
        tabBarIcon: TabBarIcon('FontAwesome')('television')(vmin(6))
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: TabBarIcon('FontAwesome')('search')(vmin(6))
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        headerTitleStyle: {
          color: 'white',
          fontSize: vmin(5),
          color: 'white',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1
        },
        headerStyle: {
          backgroundColor: '#23272A'
        },
        headerTintColor: 'white'
      };
    },
    tabBarOptions: {
      style: {
        backgroundColor: '#23272A',
        height: vmin(13)
      },
      labelStyle: {
        fontSize: vmin(3)
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
    MovieGenreMoreScreen,
    CastDetailScreen,
    TelevisionDetailScreen,
    MovieMoreScreen,
    TelevisionGenreMoreScreen,
    TelevisionMoreScreen
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
