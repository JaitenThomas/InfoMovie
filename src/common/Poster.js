import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class Poster extends PureComponent {
  state = {};
  renderPosterImage = () => {
    if (this.props.item.poster_path !== null) {
      return (
        <FastImage
          style={styles.imageStyle}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${this.props.item.poster_path}`
          }}
        />
      );
    } else {
      return (
        <FastImage
          style={styles.imageStyle}
          source={require('../images/not_found.png')}
        />
      );
    }
  };

  handlePress = () => {
    if (this.props.type === 'movie') {
      this.props.navigation.navigate('MovieDetailScreen', {
        id: this.props.item.id,
        title: this.props.item.title
      });
    } else if (this.props.type === 'tv') {
      this.props.navigation.navigate('TelevisionDetailScreen', {
        id: this.props.item.id,
        title: this.props.item.title
      });
    }
  };

  renderText = () => {
    if (this.props.type === 'movie') {
      return <Text style={{ color: 'white' }}>{this.props.item.title}</Text>;
    } else if (this.props.type === 'tv') {
      return <Text style={{ color: 'white' }}>{this.props.item.name}</Text>;
    }
  };
  render() {
    return (
      <View style={{ height: 'auto', width: 'auto' }}>
        <View style={styles.mainContainerStyle}>
          <TouchableOpacity
            style={{
              height: '100%',
              backgroundColor: '#23272A'
            }}
            activeOpacity={1}
            onPress={this.handlePress}
          >
            {this.renderPosterImage()}
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: vmin(3),
            color: 'white',
            width: Dimensions.get('window').width * 0.3,
            height: 'auto'
          }}
        >
          {this.renderText()}
        </Text>
      </View>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: Dimensions.get('window').height * 0.25,
    width: Dimensions.get('window').width * 0.3
  },
  imageStyle: {
    width: 'auto',
    height: '100%',
    resizeMode: 'cover'
  }
};

export default Poster;
