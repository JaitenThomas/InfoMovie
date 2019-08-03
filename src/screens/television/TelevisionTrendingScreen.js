import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';

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
    error: ''
  };

  componentDidMount() {
    this.fetchAiringTodayData();
    this.fetchPopularData();
    this.fetchNowOnAirData();
    this.fetchTopRatedData();
  }

  fetchAiringTodayData() {
    const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          airingTodayData: data.results,
          error: data.error || null
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  fetchNowOnAirData() {
    const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          onAirData: data.results,
          error: data.error || null
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  fetchPopularData() {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          popularData: data.results,
          error: data.error || null
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  fetchTopRatedData() {
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          topRatedData: data.results,
          error: data.error || null
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <ScrollView style={styles.scrollContainerStyle}>
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
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={0.1}
            // ListFooterComponent={<ActivityIndicator size={35} />}
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
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={0.1}
            // ListFooterComponent={<ActivityIndicator size={35} />}
          />

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
            // onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={0.1}
            // ListFooterComponent={<ActivityIndicator size={35} />}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  mainContainerStyle: {
    flex: 1,
    alignItems: 'center',
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
