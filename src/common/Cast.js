import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

class Cast extends Component {
  state = {};

  renderPosterImage() {
    if (this.props.item.profile_path !== null) {
      return (
        <FastImage
          style={{ width: 100, height: 150, borderRadius: 15 }}
          source={{ uri: `${IMAGE_PATH}${this.props.item.profile_path}` }}
        />
      );
    } else {
      return (
        <FastImage
          style={{ width: 100, height: 150, borderRadius: 15 }}
          imageStyle={{ resizeMode: 'center' }}
          source={require('../images/not_found.png')}
        />
      );
    }
  }

  render() {
    return (
      <View style={{ marginRight: 10 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.navigate('CastDetailScreen', {
              id: this.props.item.id,
              name: this.props.item.name,
              image: this.props.image
            });
          }}
        >
          {this.renderPosterImage()}
          <View style={{ width: 100 }}>
            <Text style={{ color: 'white' }}>{this.props.item.character}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Cast;
