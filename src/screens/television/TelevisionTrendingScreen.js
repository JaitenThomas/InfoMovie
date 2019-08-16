import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import Poster from '../../common/Poster';
import Icon from 'react-native-vector-icons/Entypo';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

class TelevisionScreen extends Component {
  state = {
    airingTodayData: [],
    popularData: [],
    onAirData: [],
    topRated: [],
    error: '',
    loading: false
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    this.setState({ loading: true });

    const airingTodayURL = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`;
    const popularURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const onAirURL = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;
    const topRatedURL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

    const airingTodayData = await fetch(airingTodayURL);
    const popularData = await fetch(popularURL);
    const onAirData = await fetch(onAirURL);
    const topRatedData = await fetch(topRatedURL);

    const airingTodayJson = await airingTodayData.json();
    const popularJson = await popularData.json();
    const onAirJson = await onAirData.json();
    const topRatedJson = await topRatedData.json();

    this.setState({
      airingTodayData: airingTodayJson.results,
      popularData: popularJson.results,
      onAirData: onAirJson.results,
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
          <Text style={styles.sectionHeaderTitleStyle}>Now On Air</Text>
          <Icon.Button
            style={styles.sectionHeaderIconStyle}
            size={vmin(6)}
            name="dots-three-horizontal"
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => {
              this.props.navigation.navigate('TelevisionMoreScreen', {
                title: 'Now On Air',
                type: 'on_the_air'
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
          data={this.state.onAirData}
          renderItem={(item, index) => {
            return (
              <Poster
                navigation={this.props.navigation}
                key={item.item.id}
                item={item.item}
                type={'tv'}
              />
            );
          }}
          keyExtractor={item => {
            return item.id.toString();
          }}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeaderStyle}>
          <Text style={styles.sectionHeaderTitleStyle}>Airing Today</Text>
          <Icon.Button
            style={styles.sectionHeaderIconStyle}
            size={vmin(6)}
            name="dots-three-horizontal"
            backgroundColor="transparent"
            underlayColor="transparent"
            onPress={() => {
              this.props.navigation.navigate('TelevisionMoreScreen', {
                title: 'Airing Today',
                type: 'airing_today'
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
          data={this.state.airingTodayData}
          renderItem={(item, index) => {
            return (
              <Poster
                navigation={this.props.navigation}
                key={item.item.id}
                item={item.item}
                type={'tv'}
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
              this.props.navigation.navigate('TelevisionMoreScreen', {
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
                type={'tv'}
              />
            );
          }}
          keyExtractor={item => {
            return item.id.toString();
          }}
          showsHorizontalScrollIndicator={false}
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
              this.props.navigation.navigate('TelevisionMoreScreen', {
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
                type={'tv'}
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

export default TelevisionScreen;
