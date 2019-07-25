import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

import Poster from '../../movie/MoviePoster';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

class MovieUpcomingScreen extends Component {
  state = {
    genreData: [],
    error: ''
  };

  componentDidMount() {
    this.fetchGenreData();
  }

  fetchGenreData() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          genreData: data.genres
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  fetchMovieData(id) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&page=1&with_genres=${id}`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          genreData: data.genres
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
          {this.state.genreData.map(genre => {
            return (
              <View key={genre.id} style={styles.rowContainerStyle}>
                <TouchableOpacity
                  style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}
                  onPress={() =>
                    this.props.navigation.navigate('MovieGenreDetailScreen', {
                      id: genre.id,
                      name: genre.name
                    })
                  }
                >
                  <Text style={styles.sectionTitleStyle}>{genre.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
{
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

export default MovieUpcomingScreen;
