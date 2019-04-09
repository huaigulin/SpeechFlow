import React, { Component } from 'react';

class VideoList extends Component {
  render() {
    const urls = []
    const images = []
    for (var i=0; i<this.props.videosList.length; i++){
      var url = 'https://i1.ytimg.com/vi/' + this.props.videosList[i] + '/default.jpg';
      images.push(
        <img src={url} />
      )
    }

    return (
      <div>
        <h1> CURRENT VIDEOS: </h1>
        {images}
      </div>
    );
  }
}

export default VideoList;
