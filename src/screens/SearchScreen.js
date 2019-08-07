import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Poster from '../common/Poster';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

import _ from 'lodash';

class SearchScreen extends Component {
  state = {
    query: '',
    data: [],
    page: 1,
    loading: false
  };

  fetchData = _.debounce(() => {
    const uri = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${
      this.state.query
    }&page=${this.state.page}&include_adult=false`;

    fetch(uri)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res.results],
          loading: false
        });
      });
  }, 250);

  updateSearch = query => {
    this.setState({ query, loading: true, data: [] }, () => {
      this.fetchData();
    });
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1, loading: true }, () => {
      this.fetchData();
    });
  };

  renderItem(item, index) {
    if (item.media_type == 'movie') {
      return (
        <Poster
          navigation={this.props.navigation}
          key={item.id}
          item={item}
          type={'movie'}
        />
      );
    } else if (item.media_type == 'tv') {
      return (
        <Poster
          navigation={this.props.navigation}
          key={item.id}
          item={item}
          type={'tv'}
        />
      );
    }
  }

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
    const { query } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: '#23272A' }}>
        <SearchBar
          placeholder="Type here..."
          onChangeText={this.updateSearch}
          value={query}
        />
        <FlatList
          contentContainerStyle={{
            paddingTop: 15
          }}
          columnWrapperStyle={{
            justifyContent: 'space-evenly'
          }}
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          numColumns={3}
          renderItem={(item, index) => this.renderItem(item.item, index)}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter}
          ListFooterComponentStyle={{ height: 40 }}
        />
      </View>
    );
  }
}

const styles = {};

export default SearchScreen;
