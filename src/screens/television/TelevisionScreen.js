import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import Poster from '../../television/TelevisionPoster';

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
    const url = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US`;

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

  fetchPopularData() {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`;

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

  fetchNowOnAirData() {
    const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US`;

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

  fetchTopRatedData() {
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`;

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

  // handleLoadMore = () => {
  //   this.setState(
  //     {
  //       page: this.state.page + 1
  //     },
  //     () => {
  //       this.fetchUpcomingData();
  //     }
  //   );
  // };

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <ScrollView style={styles.scrollContainerStyle}>
          <View style={styles.rowContainerStyle}>
            <Text style={styles.sectionTitleStyle}>Airing Today</Text>

            <FlatList
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
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              // onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={0.1}
              // ListFooterComponent={<ActivityIndicator size={35} />}
            />
          </View>

          <View style={styles.rowContainerStyle}>
            <Text style={styles.sectionTitleStyle}>Popular</Text>

            <FlatList
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
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              // onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={0.1}
              // ListFooterComponent={<ActivityIndicator size={35} />}
            />
          </View>

          <View style={styles.rowContainerStyle}>
            <Text style={styles.sectionTitleStyle}>On The Air</Text>

            <FlatList
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
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              // onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={0.1}
              // ListFooterComponent={<ActivityIndicator size={35} />}
            />
          </View>

          <View style={styles.rowContainerStyle}>
            <Text style={styles.sectionTitleStyle}>Top Rated</Text>

            <FlatList
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
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              // onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={0.1}
              // ListFooterComponent={<ActivityIndicator size={35} />}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  mainContainerStyle: {
    flex: 1
  },
  scrollContainerStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#23272A'
  },
  sectionTitleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: 'white'
  },
  rowContainerStyle: {
    flex: 1,
    paddingBottom: 5
  }
};

export default TelevisionScreen;
