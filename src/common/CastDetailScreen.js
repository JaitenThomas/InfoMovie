import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  ActivityIndicator
} from 'react-native';

import FastImage from 'react-native-fast-image';

const API_KEY = '11ede500a8486b89fde5f1293576baab';
const PERSON_PATH = `https://api.themoviedb.org/3/person/`;
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

import LinearGradient from 'react-native-linear-gradient';

class CastDetailScreen extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    data: {}
  };

  static navigationOptions = ({ navigation }) => ({
    // title: '' + navigation.getParam('title'),
    headerTransparent: true,
    headerTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  });

  fetchPersonDetails() {
    this.setState({ loading: true });

    const URI = `${PERSON_PATH}${
      this.state.id
    }?api_key=${API_KEY}&language=en-US`;

    fetch(URI)
      .then(res => res.json())
      .then(res =>
        this.setState({ data: res, loading: false }, () => {
          console.log(res);
        })
      );
  }

  componentWillMount() {
    this.fetchPersonDetails();
  }

  renderStar() {}

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
              uri: `${IMAGE_PATH}${this.props.navigation.getParam('image')}`
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
                      uri: `${IMAGE_PATH}${this.state.data.profile_path}`
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
                    style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}
                  >
                    {this.state.data.name}
                  </Text>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    {this.state.data.known_for_department || 'unknown'}
                  </Text>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    {this.state.data.birthday || 'unknown'}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/*BODY CONTAINER*/}
        <View style={{ backgroundColor: '#2C2F33', flex: 1.5 }}>
          <ScrollView style={{ flex: 1, paddingLeft: 15, paddingRight: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'white' }}>
              Biography
            </Text>
            <Text style={{ color: 'white' }}>{this.state.data.biography}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CastDetailScreen;
