import React, { Component } from 'react';
import { Text, ImageBackground, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class Poster extends Component {
  state = {};

  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            this.props.navigation.navigate('MovieDetailScreen', {
              id: this.props.item.id,
              title: this.props.item.title
            })
          }
        >
          <ImageBackground
            style={{ width: 190, height: 250 }}
            imageStyle={{ resizeMode: 'center' }}
            source={{
              uri: `https://image.tmdb.org/t/p/original${
                this.props.item.poster_path
              }`
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 25,
                left: 12
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
            </View>
          </ImageBackground>
          <View
            style={{
              height: 'auto',
              width: 125,
              left: 12
            }}
          >
            <Text>{this.props.item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Poster;
