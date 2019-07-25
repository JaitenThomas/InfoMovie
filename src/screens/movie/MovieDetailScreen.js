import React, { Component } from 'react';
import YoutubePlayer from 'react-native-yt-player';
import Youtube from 'react-native-youtube';
import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  ImageBackground
} from 'react-native';

import Cast from '../../common/Cast';
import Video from '../../common/Video';

import FastImage from 'react-native-fast-image';

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
    loading: false,
    genres: []
  };

  static navigationOptions = ({ navigation }) => ({
    // title: '' + navigation.getParam('title'),
    headerTransparent: true,
    headerTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  });

  fetchData() {
    this.setState({ loading: true });

    const url = `https://api.themoviedb.org/3/movie/${
      this.state.id
    }?api_key=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        let genres = [];

        res.genres.forEach(genre => {
          genres.push(genre.name);
        });

        this.setState({ data: res, loading: false, genres: genres }, () => {
          console.log(this.state.genres);
        });
      });
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
        this.setState({
          video: res.results,
          loading: false,
          genres: res.genres
        })
      );
  }

  componentDidMount() {
    this.fetchData();
    this.fetchCast();
    //this.fetchVideo();
  }

  renderGenres() {
    if (this.state.genres.length > 0) {
      return this.state.genres.map((genre, index) => {
        if (index < this.state.genres.length - 1) {
          return (
            <Text key={index} style={{ color: 'white' }}>
              {genre}/
            </Text>
          );
        } else {
          return (
            <Text key={index} style={{ color: 'white' }}>
              {genre}
            </Text>
          );
        }
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {/*HEADER CONTAINER*/}

        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <ImageBackground
            resizeMode={'cover'}
            style={{
              flex: 1
            }}
            source={{
              uri: `${IMAGE_PATH}${this.state.data.backdrop_path}`
            }}
          >
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              colors={['rgba(0, 0, 0, .4)', 'rgba(0, 0, 0, .5)']}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  display: 'flex',
                  height: '60%',
                  flexDirection: 'row',
                  width: '85%'
                }}
              >
                <View style={{ flex: 1 }}>
                  <FastImage
                    style={{ flex: 1, borderRadius: 15 }}
                    source={{
                      uri: `${IMAGE_PATH}${this.state.data.poster_path}`
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 2,
                    marginLeft: 5,
                    justifyContent: 'space-around'
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 25
                    }}
                  >
                    {this.state.data.title}
                  </Text>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    {this.state.data.vote_average}
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.renderGenres()}
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/*BODY CONTAINER*/}
        <View style={{ backgroundColor: '#2C2F33', flex: 1.5 }}>
          <ScrollView style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>
              Summary
            </Text>
            <Text style={{ color: 'white' }}>{this.state.data.overview}</Text>
            <View>
              <Text
                style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}
              >
                Cast
              </Text>
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
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default MovieDetailScreen;
