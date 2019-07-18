import React, { Component } from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';

import Carousel from 'react-native-snap-carousel';

const API_KEY = '11ede500a8486b89fde5f1293576baab';

import Poster from '../../movie/Poster';

class MoviePopularScreen extends Component {
  state = {
    popularData: []
  };

  fetchPopularData() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then(data => data.json())
      .then(data =>
        this.setState({ popularData: data.results }, () => {
          console.log(this.state.popularData);
        })
      );
  }

  componentDidMount() {
    // this.fetchPopularData();
  }

  render() {
    return (
      <View style={{ backgroundColor: 'white', marginBottom: 75 }}>
        <View>
          <Text style={{ marginLeft: 5, fontSize: 25, fontWeight: 'bold' }}>
            Popular
          </Text>

          <FlatList
            indicatorStyle={'default'}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            data={this.state.popularData}
            renderItem={(item, index) => {
              return <Poster key={item.item.id} item={item.item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {}
};

export default MoviePopularScreen;
