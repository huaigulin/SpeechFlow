import React, { Component } from 'react';
import PlayCircle from '@material-ui/icons/PlayCircleFilled';
import Fab from '@material-ui/core/Fab';

class VideoList extends Component {
  render() {
    const images = [];
    var videosList = this.props.videosList;
    if (typeof videosList === 'string') {
      videosList = JSON.parse(videosList);
    }
    for (var i = 0; i < videosList.length; i++) {
      var url = 'https://i1.ytimg.com/vi/' + videosList[i] + '/default.jpg';
      images.push(
        <div>
          <Fab color="primary" aria-label="Play" size="small">
            <PlayCircle />
          </Fab>
          <img src={url} key={i} alt="video thumnail" />
        </div>
      );
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
