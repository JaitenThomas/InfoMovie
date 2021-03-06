import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';

import Poster from '../../common/Poster';

import Icon from 'react-native-vector-icons/Entypo';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

import { vmin } from 'react-native-expo-viewport-units';

import SplashScreen from 'react-native-splash-screen';

class MovieTrendingScreen extends Component {
  state = {
    upcomingData: [],
    popularData: [],
    nowPlayingData: [],
    topRatedData: [],
    error: '',
    loading: false
  };

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: true });

    const upcomingURI = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
    const popularURI = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const nowPlayingURI = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
    const topRatedURI = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

    const upcomingData = await fetch(upcomingURI);
    const popularData = await fetch(popularURI);
    const nowPlayingData = await fetch(nowPlayingURI);
    const topRatedData = await fetch(topRatedURI);

    const upcomingJson = await upcomingData.json();
    const popularJson = await popularData.json();
    const nowPlayingJson = await nowPlayingData.json();
    const topRatedJson = await topRatedData.json();

    this.setState({
      upcomingData: upcomingJson.results,
      popularData: popularJson.results,
      nowPlayingData: nowPlayingJson.results,
      topRatedData: topRatedJson.results,
      loading: false
    });
  }

  renderLoading() {
    return this.state.loading ? (
      <ActivityIndicator size={vmin(10)} />
    ) : (
      <ScrollView style={styles.scrollContainerStyle}>
        <View style={styles.sectionHeaderStyle}>
          <Text style={styles.sectionHeaderTitleStyle}>Upcoming</Text>
          <Icon.Button
            style={styles.sectionHeaderIconStyle}
            size={vmin(6)}
            name="dots-three-horizontal"
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => {
              this.props.navigation.navigate('MovieMoreScreen', {
                title: 'Upcoming',
                type: 'upcoming'
              });
            }}
          />
        </View>

        <FlatList
          contentContainerStyle={{
            paddingRight: 10,
            marginTop: 5
          }}
          ItemSeparatorComponent={() => <View style={{ marginRight: 5 }} />}
          indicatorStyle={'default'}
          horizontal
          showsVerticalScrollIndicator={false}
          data={this.state.upcomingData}
          renderItem={(item, index) => {
            return (
              <Poster
                navigation={this.props.navigation}
                key={item.item.id}
                item={item.item}
                type={'movie'}
              />
            );
          }}
          keyExtractor={item => {
            return item.id.toString();
          }}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeaderStyle}>
          <Text style={styles.sectionHeaderTitleStyle}>Popular</Text>
          <Icon.Button
            style={styles.sectionHeaderIconStyle}
            size={vmin(6)}
            name="dots-three-horizontal"
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => {
              this.props.navigation.navigate('MovieMoreScreen', {
                title: 'Popular',
                type: 'popular'
              });
            }}
          />
        </View>

        <FlatList
          contentContainerStyle={{
            paddingRight: 10,
            marginTop: 5
          }}
          ItemSeparatorComponent={() => <View style={{ marginRight: 5 }} />}
          indicatorStyle={'default'}
          horizontal
          showsVerticalScrollIndicator={false}
          data={this.state.popularData}
          renderItem={(item, index) => {
            return (
              <Poster
                navigation={this.props.navigation}
                key={item.item.id}
                item={item.item}
                type={'movie'}
              />
            );
          }}
          keyExtractor={item => {
            return item.id.toString();
          }}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeaderStyle}>
          <Text style={styles.sectionHeaderTitleStyle}>Now Playing</Text>
          <Icon.Button
            style={styles.sectionHeaderIconStyle}
            size={vmin(6)}
            name="dots-three-horizontal"
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => {
              this.props.navigation.navigate('MovieMoreScreen', {
                title: 'Now Playing',
                type: 'now_playing'
              });
            }}
          />
        </View>

        <FlatList
          contentContainerStyle={{
            paddingRight: 10,
            marginTop: 5
          }}
          ItemSeparatorComponent={() => <View style={{ marginRight: 5 }} />}
          indicatorStyle={'default'}
          horizontal
          showsVerticalScrollIndicator={false}
          data={this.state.nowPlayingData}
          renderItem={(item, index) => {
            return (
              <Poster
                navigation={this.props.navigation}
                key={item.item.id}
                item={item.item}
                type={'movie'}
              />
            );
          }}
          keyExtractor={item => {
            return item.id.toString();
          }}
          showsHorizontalScrollIndicator={false}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.1}
          // ListFooterComponent={<ActivityIndicator size={35} />}
        />

        <View style={styles.sectionHeaderStyle}>
          <Text style={styles.sectionHeaderTitleStyle}>Top Rated</Text>
          <Icon.Button
            style={styles.sectionHeaderIconStyle}
            size={vmin(6)}
            name="dots-three-horizontal"
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => {
              this.props.navigation.navigate('MovieMoreScreen', {
                title: 'Top Rated',
                type: 'top_rated'
              });
            }}
          />
        </View>

        <FlatList
          contentContainerStyle={{
            paddingRight: 10,
            marginTop: 5
          }}
          ItemSeparatorComponent={() => <View style={{ marginRight: 5 }} />}
          indicatorStyle={'default'}
          horizontal
          showsVerticalScrollIndicator={false}
          data={this.state.topRatedData}
          renderItem={(item, index) => {
            return (
              <Poster
                navigation={this.props.navigation}
                key={item.item.id}
                item={item.item}
                type={'movie'}
              />
            );
          }}
          keyExtractor={item => {
            return item.id.toString();
          }}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>{this.renderLoading()}</View>
    );
  }
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#23272A'
  },
  scrollContainerStyle: {
    width: '100%',
    height: '33%',
    paddingLeft: 10
  },

  sectionHeaderStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionHeaderTitleStyle: {
    color: 'white',
    fontSize: vmin(5),
    fontWeight: 'bold'
  },
  sectionHeaderIconStyle: {
    margin: 0,
    paddingLeft: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingTop: 0
  }
};

export default MovieTrendingScreen;
