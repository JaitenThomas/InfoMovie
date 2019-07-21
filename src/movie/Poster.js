import React, { Component } from 'react';
import { Text, ImageBackground, View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import Icon from 'react-native-vector-icons/FontAwesome';

class Poster extends Component {
  state = {};

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
          <FastImage
            style={styles.imageStyle}
            imageStyle={{ resizeMode: 'center' }}
            source={{
              uri: `https://image.tmdb.org/t/p/original${
                this.props.item.poster_path
              }`
            }}
          >
            {/* <View
              style={{
                position: 'absolute',
                top: 25,
                paddingLeft: 5
              }}
            >
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  width: 75,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flexDirection: 'row'
                }}
              >
                <Icon name="star" size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 20 }}>
                  {this.props.item.vote_average}
                </Text>
              </View>
            </View> */}
          </FastImage>
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

export default Poster;
