import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = {
  root: {
    color: grey[50]
  }
};

class VideoThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.videoCheckedStates[this.props.index]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    var videoCheckedStates = this.props.videoCheckedStates;
    videoCheckedStates[this.props.index] = event.target.checked;
    this.props.setVideoCheckedStates(videoCheckedStates);
  };

  render() {
    const { classes } = this.props;

    const styleThumbnailDiv = {
      position: 'relative',
      display: 'inline-block'
    };

    const styleThumbnailCheckbox = {
      position: 'absolute',
      left: '135px',
      bottom: '5px'
    };

    return (
      <div style={styleThumbnailDiv}>
        <Checkbox
          style={styleThumbnailCheckbox}
          classes={{ root: classes.root, checked: classes.checked }}
          checked={this.state.checked}
          onChange={this.handleChange}
        />
        <img src={this.props.src} alt="video thumbnail" />
      </div>
    );
  }
}

export default withStyles(styles)(VideoThumbnail);
