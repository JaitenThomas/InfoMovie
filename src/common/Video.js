import React, { Component } from 'react';

import YoutubePlayer from 'react-native-yt-player';
import { View } from 'react-native';
class Video extends Component {
  state = {
    key: this.props.item.key
  };

  render() {
    return (
      <View>
        <YoutubePlayer
          videoId={`${this.state.key}`}
          onStart={() => console.log('onStart')}
          onEnd={() => alert('on End')}
        />
      </View>
    );
  }
}
//AIzaSyBMxmUp60TKFgMgSrUZhRIOF1P8pQrFmfQ
export default Video;
