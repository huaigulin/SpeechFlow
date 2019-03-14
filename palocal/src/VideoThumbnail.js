import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './VideoThumbnail.css';

class VideoThumbnail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="thumbnailDiv">
        <Checkbox className="thumbnailCheckbox" />
        <img
          className="thumbnailImage"
          src={this.props.src}
          alt={this.props.alt}
        />
      </div>
    );
  }
}

export default VideoThumbnail;
