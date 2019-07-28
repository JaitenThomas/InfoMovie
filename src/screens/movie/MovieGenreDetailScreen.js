import React, { Component } from 'react';

import { View, FlatList, ActivityIndicator } from 'react-native';

import Poster from '../../common/Poster';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

class MovieGenreDetailScreen extends Component {
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

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&page=${
      this.state.page
    }&with_genres=${this.state.id}`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res.results],
          loading: false
        });
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
                <Poster
                  navigation={this.props.navigation}
                  key={item.item.id}
                  item={item.item}
                  type={'movie'}
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

export default MovieGenreDetailScreen;
