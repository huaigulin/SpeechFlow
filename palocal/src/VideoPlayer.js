import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends Component {
  render() {
    return (
      <ReactPlayer
        url="https://www.youtube.com/watch?v=bESGLojNYSo"
        playing="true"
        controls="true"
        width="1280px"
        height="720px"
      />
    );
  }
}

export default VideoPlayer;
