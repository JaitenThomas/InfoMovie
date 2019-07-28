import React, { Component } from 'react';
import { View, Text, ScrollView, ImageBackground } from 'react-native';

import FastImage from 'react-native-fast-image';

const API_KEY = '11ede500a8486b89fde5f1293576baab';
const PERSON_PATH = `https://api.themoviedb.org/3/person/`;
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

import LinearGradient from 'react-native-linear-gradient';

class CastDetailScreen extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    data: {},
    age: undefined,
    birthday: undefined,
    gender: undefined,
    knownForDepartment: undefined
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
        this.setState(
          { data: res, birthday: res.birthday, loading: false },
          () => {
            this.calculateAge(res.birthday);
            this.formatBirthday(res.birthday);
            this.formatGender(res.gender);
            this.formatKnownForDepartment(res.known_for_department);
          }
        )
      );
  }

  componentWillMount() {
    this.fetchPersonDetails();
  }

  renderProfileImage() {
    if (this.state.data.profile_path !== null) {
      return (
        <FastImage
          style={{ flex: 1, borderRadius: 15 }}
          imageStyle={{ resizeMode: 'center' }}
          source={{
            uri: `${IMAGE_PATH}${this.state.data.profile_path}`
          }}
        />
      );
    } else {
      return (
        <FastImage
          style={{ flex: 1, borderRadius: 15 }}
          source={require('../images/not_found.png')}
        />
      );
    }
  }

  formatKnownForDepartment(knownForDepartment) {
    if (knownForDepartment === null) {
      this.setState({ knownForDepartment: 'Unknown' });
    } else {
      this.setState({ knownForDepartment });
    }
  }

  formatGender(gender) {
    if (gender == 1) {
      this.setState({ gender: 'Female' });
    } else if (gender == 2) {
      this.setState({ gender: 'Male' });
    } else {
      this.setState({ gender: 'Unknown' });
    }
  }

  formatBirthday(birthday) {
    if (birthday === null) {
      this.setState({ birthday: 'Unknown' });
    } else {
      var formatedBirthday = birthday.replace(/-/g, '/');

      this.setState({ birthday: formatedBirthday });
    }
  }

  calculateAge(birthday) {
    if (birthday === null) {
      this.setState({ age: 'Unknown' });
    } else {
      var formatedBirthday = new Date(birthday);

      var ageDifMs = Date.now() - formatedBirthday.getTime();
      var ageDate = new Date(ageDifMs);

      var calculation = Math.abs(ageDate.getUTCFullYear() - 1970);

      this.setState({ age: calculation + ' yo' });
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
                <View style={{ flex: 1 }}>{this.renderProfileImage()}</View>
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
                    {`${this.state.gender} | ` +
                      this.state.knownForDepartment || 'Unknown'}
                  </Text>
                  <Text style={{ color: 'white', fontSize: 20 }}>
                    {this.state.birthday + ` | ${this.state.age}` || 'Unknown'}
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
            <Text style={{ color: 'white' }}>
              {this.state.data.biography || 'No information provided.'}
            </Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CastDetailScreen;
