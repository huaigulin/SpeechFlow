import React, { Component } from 'react';

class VideoList extends Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <h1> CURRENT VIDEOS: </h1>
        <p> {this.props.videos[0]} </p>
      </div>
    )
  }

}

export default VideoList;
