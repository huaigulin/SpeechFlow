import React, { Component } from 'react';
import UploadPDFAndImage from './UploadPDFAndImage';
import Navbar from './Navbar';
import UploadVideoLink from './UploadVideoLink';
import FileDisplay from './FileDisplay';
import VideoThumbnailDisplay from './VideoThumbnailDisplay';

class PageMaterials extends Component {
  render() {
    const isLoggedIn = this.props.userName != null;
    return (
      <div>
        <Navbar />
        {isLoggedIn ? (
          <div />
        ) : (
          <h3>You have not logged in. Please log in or sign up.</h3>
        )}
        {isLoggedIn ? (
          <FileDisplay
            userName={this.props.userName}
            fileCheckedStates={this.props.fileCheckedStates}
            setFileCheckedStates={this.props.setFileCheckedStates}
          />
        ) : (
          <div />
        )}
        {isLoggedIn ? (
          <VideoThumbnailDisplay
            userName={this.props.userName}
            videoCheckedStates={this.props.videoCheckedStates}
            setVideoCheckedStates={this.props.setVideoCheckedStates}
          />
        ) : (
          <div />
        )}
        {isLoggedIn ? (
          <UploadPDFAndImage userName={this.props.userName} />
        ) : (
          <div />
        )}
        {isLoggedIn ? (
          <UploadVideoLink userName={this.props.userName} />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default PageMaterials;
