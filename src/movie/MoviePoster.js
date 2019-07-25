import React, { Component } from 'react';
import { Text, ImageBackground, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import Icon from 'react-native-vector-icons/FontAwesome';

class MoviePoster extends Component {
  state = {};

  renderPosterImage() {
    if (this.props.item.poster_path !== null) {
      return (
        <FastImage
          style={styles.imageStyle}
          imageStyle={{ resizeMode: 'center' }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${this.props.item.poster_path}`
          }}
        />
      );
    } else {
      return (
        <FastImage
          style={styles.imageStyle}
          imageStyle={{ resizeMode: 'center' }}
          source={require('../images/not_found.png')}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('MovieDetailScreen', {
              id: this.props.item.id,
              title: this.props.item.title
            })
          }
        >
          {this.renderPosterImage()}
          <View style={styles.titleContainerStyle}>
            <Text style={{ color: 'white' }}>{this.props.item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  mainContainerStyle: {
    marginRight: 5
  },
  imageStyle: {
    height: 200
  },
  titleContainerStyle: {
    height: 'auto',
    width: 125
  },
  titleTextStyle: {
    color: 'white'
  }
};

export default MoviePoster;
