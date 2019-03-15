import React, { Component } from 'react';
import axios from 'axios';
import VideoThumbnail from './VideoThumbnail.js';

class VideoThumbnailDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnails: [],
      checkedStates: this.props.videoCheckedStates
    };
    this.getThumbnails = this.getThumbnails.bind(this);
    this.getThumbnails(this.props.userName);
  }

  getThumbnails(userName) {
    const formData = new FormData();
    formData.append('userName', userName);
    axios
      .post(`/getThumbnails`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        var urls = response.data;
        var thumbnails = [];
        var checkedStates = [];

        for (var i = 0; i < urls.length; i++) {
          thumbnails.push(
            <VideoThumbnail
              src={urls[i]}
              alt="video thumnail"
              key={i}
              index={i}
            />
          );
          checkedStates.push(false);
        }
        this.setState({ thumbnails: thumbnails });
        this.props.setVideoCheckedStates(checkedStates);
      })
      .catch(error => {
        console.log('ERROR in getThumbnails post request: ' + error);
      });
  }

  render() {
    return (
      <div>
        <h5>Your Videos:</h5>
        <div>{this.state.thumbnails}</div>
      </div>
    );
  }
}

export default VideoThumbnailDisplay;
