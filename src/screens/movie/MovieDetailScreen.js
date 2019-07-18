import React, { Component } from 'react';

import { View, Text, Image, FlatList, ScrollView } from 'react-native';

import Cast from '../../common/Cast';
import Video from '../../common/Video';

const API_KEY = '11ede500a8486b89fde5f1293576baab';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';
const CAST_PATH = 'http://api.themoviedb.org/3/movie';
const VIDEO_PATH = 'http://api.themoviedb.org/3/movie';

class MovieDetailScreen extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    data: {},
    cast: [],
    video: [],
    loading: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: '' + navigation.getParam('title')
  });

  fetchData() {
    this.setState({ loading: true });

    const url = `https://api.themoviedb.org/3/movie/${
      this.state.id
    }?api_key=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(res =>
        this.setState({ data: res, loading: false }, () => {
          //console.log(res);
        })
      );
  }

  fetchCast() {
    this.setState({ loading: true });

    const url = `https://api.themoviedb.org/3/movie/${
      this.state.id
    }/casts?api_key=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(res =>
        this.setState({ cast: res.cast, loading: false }, () => {
          //console.log(this.state.cast);
        })
      );
  }

  fetchVideo() {
    this.setState({ loading: true });

    const url = `https://api.themoviedb.org/3/movie/${
      this.state.id
    }/videos?api_key=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(res =>
        this.setState({ video: res.results, loading: false }, () => {
          console.log(this.state.video);
        })
      );
  }

  componentDidMount() {
    this.fetchData();
    this.fetchCast();
    this.fetchVideo();
  }

  render() {
    return (
      <View>
        <View style={{ height: 200 }}>
          <Image
            style={{ flex: 1 }}
            source={{ uri: `${IMAGE_PATH}${this.state.data.backdrop_path}` }}
          />
        </View>

        <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Summary</Text>
            <Text>{this.state.data.overview}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Cast</Text>
            <FlatList
              data={this.state.cast}
              renderItem={(item, index) => {
                return (
                  <Cast
                    navigation={this.props.navigation}
                    image={this.state.data.backdrop_path}
                    key={item.item.id}
                    item={item.item}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>
          {/* <View style={{ paddingBottom: 300 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Trailers</Text>
            <FlatList
              data={this.state.video}
              renderItem={(item, index) => {
                return (
                  <Video
                    navigation={this.props.navigation}
                    key={item.item.id}
                    item={item.item}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View> */}
        </ScrollView>
      </View>
    );
  }
}

export default MovieDetailScreen;
