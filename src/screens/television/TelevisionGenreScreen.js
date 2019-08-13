import React, { Component } from 'react';
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class TelevisionGenreScreen extends Component {
  state = {
    genreData: [],
    error: ''
  };

  componentDidMount() {
    this.fetchGenreData();
  }

  fetchGenreData() {
    const url = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

    fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          genreData: data.genres
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  renderItem = ({ item }, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('TelevisionGenreMoreScreen', {
            id: item.id,
            name: item.name
          });
        }}
      >
        <Text style={styles.sectionTitleStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => {
    return <View style={{ height: 1, backgroundColor: 'white' }} />;
  };

  render() {
    return (
      <View style={styles.mainContainerStyle}>
        <ScrollView style={styles.scrollContainerStyle}>
          <FlatList
            data={this.state.genreData}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => {
              return item.id.toString();
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  mainContainerStyle: {
    flex: 1
  },
  scrollContainerStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#23272A'
  },
  sectionTitleStyle: {
    fontSize: vmin(5),
    fontWeight: 'bold',
    paddingBottom: 5,
    color: 'white'
  }
};

export default TelevisionGenreScreen;
