import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PlayCircle from '@material-ui/icons/PlayCircleFilled';
import Fab from '@material-ui/core/Fab';
import axios from 'axios';

const styles = {
  thumbnailDiv: {
    position: 'relative',
    display: 'inline-block',
    padding: '2px'
  },
  fab: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: '40px',
    bottom: '30px'
  }
};

class VideoList extends Component {
  handlePlay = (videoID, event) => {
    this.props.socket.emit('play video', videoID);

    const formData = new FormData();
    formData.append('userName', this.props.userName);
    formData.append('videoID', videoID);

    axios
      .post(`/changePresentationVideoID`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .catch(error => {
        console.log(
          'Error in react changePresentationVideoID post request: ' + error
        );
      });
  };

  componentDidMount() {
    this.props.socket.on('play video', videoID => {
      this.props.setVideoLink(videoID);
      sessionStorage.setItem('videoID', videoID);
    });
  }

  render() {
    const { classes } = this.props;
    const images = [];
    var videosList = this.props.videosList;
    if (typeof videosList === 'string') {
      videosList = JSON.parse(videosList);
    }
    for (var i = 0; i < videosList.length; i++) {
      const videoID = videosList[i];
      const url = 'https://i1.ytimg.com/vi/' + '9j7ANRXsCwc' + '/default.jpg';
      images.push(
        <div className={classes.thumbnailDiv} key={i}>
          <Fab
            color="primary"
            aria-label="Play"
            size="small"
            className={classes.fab}
            onClick={event => this.handlePlay(videoID, event)}
          >
            <PlayCircle fontSize="large" />
          </Fab>
          <img src={url} alt="video thumnail" />
        </div>
      );
    }

    return (
      <div>
        <h5> Your videos: </h5>
        {images}
      </div>
    );
  }
}

export default withStyles(styles)(VideoList);
