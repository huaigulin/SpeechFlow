import React, { Component } from 'react';

class VideoList extends Component {
  render() {
    const images = [];
    var videosList = this.props.videosList;
    if (typeof videosList === 'string') {
      videosList = JSON.parse(videosList);
    }
    for (var i = 0; i < videosList.length; i++) {
      var url = 'https://i1.ytimg.com/vi/' + videosList[i] + '/default.jpg';
      images.push(<img src={url} key={i} alt="video thumnail" />);
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
