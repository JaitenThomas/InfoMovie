import React, { Component } from 'react';

import { View, FlatList, ActivityIndicator } from 'react-native';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

import Poster from '../../common/Poster';

import _ from 'lodash';

class MovieMoreScreen extends Component {
  state = {
    data: [],
    page: 1
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
      flex: 1
    },
    headerTintColor: 'white',
    headerRight: <View />
  });

  fetchData = () => {
    this.setState({ loading: true });

    const url = `https://api.themoviedb.org/3/movie/${this.props.navigation.getParam(
      'type'
    )}?api_key=${API_KEY}&language=en-US&page=${this.state.page}&with_genres=${
      this.state.id
    }`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
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
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchData();
    });
  };

  renderFooter = () => {
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
                <Poster
                  navigation={this.props.navigation}
                  key={item.item.id}
                  item={item.item}
                  type={'movie'}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            ListFooterComponentStyle={{ height: 40 }}
          />
        </View>
      </View>
    );
  }
}

export default MovieMoreScreen;
