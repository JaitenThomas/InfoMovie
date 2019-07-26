import React, { Component } from 'react';

import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';

import TelevisionPoster from '../../television/TelevisionPoster';

const API_KEY = '11ede500a8486b89fde5f1293576baab';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/original';

class TelevisionGenreDetailScreen extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    name: this.props.navigation.getParam('name'),
    data: [],
    page: 1
  };

  static navigationOptions = ({ navigation }) => ({
    title: '' + navigation.getParam('name'),

    headerStyle: {
      backgroundColor: '#23272A'
    },
    headerTitleStyle: {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1
    },
    headerTintColor: 'white',
    headerRight: <View />
  });

  fetchData() {
    this.setState({ loading: true });

    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&page=${
      this.state.page
    }&with_genres=${this.state.id}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState(
          { data: [...this.state.data, ...res.results], loading: false },
          () => {
            console.log(this.state.data);
          }
        );
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleLoadMore() {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchData();
    });
  }

  renderFooterComponent() {
    return <ActivityIndicator size={35} />;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#23272A' }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 25
          }}
        >
          <FlatList
            data={this.state.data}
            numColumns={3}
            renderItem={(item, index) => {
              return (
                <TelevisionPoster
                  navigation={this.props.navigation}
                  key={item.item.id}
                  item={item.item}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => this.handleLoadMore()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => this.renderFooterComponent()}
          />
        </View>
      </View>
    );
  }
}

export default TelevisionGenreDetailScreen;