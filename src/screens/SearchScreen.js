import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Poster from '../common/Poster';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

import _ from 'lodash';

import { vmin } from 'react-native-expo-viewport-units';

class SearchScreen extends Component {
  state = {
    query: '',
    data: [],
    page: 1,
    loading: false,
    error: ''
  };

  fetchData = () => {
    const uri = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${
      this.state.query
    }&page=${this.state.page}&include_adult=false`;

    fetch(uri)
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
          loading: false,
          error: ''
        });
      });
  };

  updateSearch = () => {
    this.setState({ data: [], error: '', page: 1 }, () => {
      this.fetchData();
    });
  };

  updateText = query => {
    this.setState({ query, date: [] });
  };

  handleLoadMore = () => {
    if (this.state.loading == false) {
      this.setState({ page: this.state.page + 1, loading: true }, () => {
        this.fetchData();
      });
    }
  };

  renderItem(item, index) {
    if (item.media_type == 'movie') {
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
    } else if (item.media_type == 'tv') {
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

  render() {
    const { query } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: '#23272A' }}>
        <SearchBar
          placeholder="Type here..."
          onChangeText={this.updateText}
          value={query}
          onEndEditing={this.updateSearch}
        />
        <FlatList
          contentContainerStyle={{
            paddingTop: 15,
            alignSelf: 'center'
          }}
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          numColumns={3}
          renderItem={(item, index) => this.renderItem(item.item, index)}
          keyExtractor={(item, index) => index.toString()}
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

const styles = {};

export default SearchScreen;
