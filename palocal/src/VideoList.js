import React, { Component } from 'react';

class VideoList extends Component {
  render() {
    return (
      <div>
        <h1> CURRENT VIDEOS: </h1>
        <p> {this.props.videosList} </p>
      </div>
    );
  }
}

export default VideoList;
