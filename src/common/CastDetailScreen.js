import React, { Component } from 'react';
import { View, Text, Image, ScrollView, ImageBackground } from 'react-native';

const API_KEY = '11ede500a8486b89fde5f1293576baab';
const PERSON_PATH = `https://api.themoviedb.org/3/person/`;
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

class CastDetailScreen extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    data: {}
  };

  static navigationOptions = ({ navigation }) => ({
    title: '' + navigation.getParam('name')
  });

  fetchPersonDetails() {
    const URI = `${PERSON_PATH}${
      this.state.id
    }?api_key=${API_KEY}&language=en-US`;

    fetch(URI)
      .then(res => res.json())
      .then(res =>
        this.setState({ data: res }, () => {
          console.log(res);
        })
      );
  }

  componentDidMount() {
    this.fetchPersonDetails();
  }

  render() {
    return (
      <React.Fragment>
        <View style={{ height: 200 }}>
          <ImageBackground
            style={{
              display: 'flex',
              backgroundColor: 'red',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center'
            }}
            source={{
              uri: `${IMAGE_PATH}${this.props.navigation.getParam('image')}`
            }}
          >
            <Image
              style={{
                flex: 1,
                height: '75%',
                width: '25%',
                marginLeft: 15,
                borderRadius: 15
              }}
              source={{ uri: `${IMAGE_PATH}${this.state.data.profile_path}` }}
            />
            <View
              style={{
                display: 'flex',
                flex: 2,
                flexDirection: 'column',
                backgroundColor: 'rgba(0,0,0,0)',
                height: '75%',
                width: '25%',
                justifyContent: 'space-evenly',
                marginRight: 15,
                marginLeft: 15
              }}
            >
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}
              >
                {this.state.data.name}
              </Text>
              <Text style={{ color: 'white' }}>
                {this.state.data.known_for_department}
              </Text>
              <Text style={{ color: 'white' }}>{this.state.data.birthday}</Text>
            </View>
          </ImageBackground>
        </View>
        <ScrollView style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Text>{this.state.data.biography}</Text>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default CastDetailScreen;
