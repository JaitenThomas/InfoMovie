import React, { Component } from 'react';

import { View, FlatList, ActivityIndicator } from 'react-native';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

import Poster from '../../common/Poster';

import _ from 'lodash';

class TelevisionMoreScreen extends Component {
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

    const url = `https://api.themoviedb.org/3/tv/${this.props.navigation.getParam(
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
    if (this.state.loading == false) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.fetchData();
      });
    }
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
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
          ListFooterComponentStyle={{ height: 40 }}
        />
      </View>
    );
  }
}

export default TelevisionMoreScreen;
