import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  Text,
  FlatList,
  ScrollView,
  ImageBackground
} from 'react-native';

import Cast from '../../common/Cast';

import FastImage from 'react-native-fast-image';

const API_KEY = '11ede500a8486b89fde5f1293576baab';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

class TelevisionDetailScreen extends Component {
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

    const url = `https://api.themoviedb.org/3/tv/${
      this.state.id
    }?api_key=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        let genres = [];

        res.genres.forEach(genre => {
          genres.push(genre.name);
        });

        this.setState({ data: res, loading: false, genres: genres });
      });
  }

  fetchCast() {
    this.setState({ loading: true });

    const url = `https://api.themoviedb.org/3/tv/${
      this.state.id
    }/credits?api_key=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ cast: res.cast, loading: false }, () => {
          //console.log(this.state.cast);
        });
      });
  }

  // fetchVideo() {
  //   this.setState({ loading: true });

  //   const url = `https://api.themoviedb.org/3/tv/${
  //     this.state.id
  //   }/videos?api_key=${API_KEY}`;

  //   fetch(url)
  //     .then(res => res.json())
  //     .then(res =>
  //       this.setState({ video: res.results, loading: false }, () => {
  //         //console.log(this.state.video);
  //       })
  //     );
  // }

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

  renderPoster() {
    if (this.state.data.poster_path !== null) {
      return (
        <FastImage
          style={{ flex: 1, borderRadius: 15 }}
          source={{
            uri: `${IMAGE_PATH}${this.state.data.poster_path}`
          }}
        />
      );
    } else {
      return (
        <FastImage
          style={{ flex: 1, borderRadius: 15 }}
          source={require('../../images/not_found.png')}
        />
      );
    }
  }

  renderCast() {
    if (this.state.cast <= 0) return null;

    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>
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
    );
  }

  renderOverview() {
    if (this.state.data.overview === '')
      return <Text style={{ color: 'white' }}>No overview found.</Text>;

    return <Text style={{ color: 'white' }}>{this.state.data.overview}</Text>;
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
                <View style={{ flex: 1 }}>{this.renderPoster()}</View>
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
                    {this.state.data.original_name}
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
              Overview
            </Text>
            {this.renderOverview()}
            {this.renderCast()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default TelevisionDetailScreen;
