import React, { Component } from 'react';

import { View, FlatList, ActivityIndicator, Text } from 'react-native';

import Poster from '../../common/Poster';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

class TelevisionGenreMoreScreen extends Component {
  state = {
    id: this.props.navigation.getParam('id'),
    name: this.props.navigation.getParam('name'),
    data: [],
    page: 1,
    error: ''
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
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&region=US&sort_by=popularity.desc&page=${
      this.state.page
    }&with_genres=${this.state.id}`;

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
  }

  componentDidMount() {
    this.fetchData();
  }

  handleLoadMore() {
    if (this.state.loading == false) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchData();
      });
    }
  }

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
          type={'tv'}
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
          data={this.state.data}
          numColumns={3}
          contentContainerStyle={{
            paddingTop: 15,
            alignSelf: 'center'
          }}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => this.renderItem(item.item, index)}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => this.handleLoadMore()}
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

export default TelevisionGenreMoreScreen;
