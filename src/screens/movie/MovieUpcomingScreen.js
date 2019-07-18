import React, { Component } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';

import Carousel from 'react-native-snap-carousel';

import Poster from '../../movie/Poster';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

class MovieUpcomingScreen extends Component {
  state = {
    upcomingData: [],
    page: 1,
    error: '',
    loading: null
  };

  componentDidMount() {
    this.fetchUpcomingData();
  }

  fetchUpcomingData() {
    this.setState({ loading: true });

    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${
      this.state.page
    }`;

    setTimeout(() => {
      fetch(url)
        .then(data => data.json())
        .then(data => {
          this.setState({
            upcomingData: [...this.state.upcomingData, ...data.results],
            error: data.error || null,
            loading: false
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    }, 1500);
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.fetchUpcomingData();
      }
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center'
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Upcoming</Text>

        <FlatList
          indicatorStyle={'default'}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={this.state.upcomingData}
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
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<ActivityIndicator size={35} />}
        />
      </View>
    );
  }
}
export default MovieUpcomingScreen;
