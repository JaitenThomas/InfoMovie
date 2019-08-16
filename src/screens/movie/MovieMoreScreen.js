import React, { Component } from 'react';

import { View, FlatList, ActivityIndicator, Text } from 'react-native';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

import Poster from '../../common/Poster';

import _ from 'lodash';

import { vmin } from 'react-native-expo-viewport-units';

class MovieMoreScreen extends Component {
  state = {
    data: [],
    page: 1,
    error: ''
  };

  static navigationOptions = ({ navigation }) => ({
    title: '' + navigation.getParam('title'),

    headerStyle: {
      backgroundColor: '#23272A'
    },
    headerTitleStyle: {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
      fontSize: vmin(5)
    },
    headerTintColor: 'white',
    headerRight: <View />
  });

  fetchData = () => {
    const url = `https://api.themoviedb.org/3/movie/${this.props.navigation.getParam(
      'type'
    )}?api_key=${API_KEY}&language=en-US&page=${this.state.page}&with_genres=${
      this.state.id
    }`;

    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.errors !== undefined && res.errors.length > 0) {
          const message = 'No input provided';

          return this.setState({ error: message });
        }

        if (res.results !== undefined && res.results.length <= 0) {
          const message = 'No more data found';

          return this.setState({ error: message });
        }

        this.setState({
          data: [...this.state.data, ...res.results],
          loading: false
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  handleLoadMore = () => {
    if (this.state.loading == false) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchData();
      });
    }
  };

  renderFooter = () => {
    if (this.state.error) {
      return (
        <Text style={{ color: 'white', fontSize: vmin(5) }}>
          {this.state.error}
        </Text>
      );
    }

    if (!this.state.loading) return null;

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <ActivityIndicator animating size={35} />
      </View>
    );
  };

  renderItem(item, index) {
    return (
      <View style={{ margin: 5 }}>
        <Poster
          navigation={this.props.navigation}
          key={item.id}
          item={item}
          type={'movie'}
        />
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#23272A'
        }}
      >
        <FlatList
          contentContainerStyle={{
            paddingTop: 15,
            alignSelf: 'center'
          }}
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          numColumns={3}
          renderItem={(item, index) => this.renderItem(item.item, index)}
          keyExtractor={item => item.id}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter}
          ListFooterComponentStyle={{
            height: 40,
            alignItems: 'center'
          }}
          windowSize={10}
        />
      </View>
    );
  }
}

export default MovieMoreScreen;
