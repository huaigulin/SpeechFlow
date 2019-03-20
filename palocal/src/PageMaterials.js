import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import UploadPDFAndImage from './UploadPDFAndImage';
import Navbar from './Navbar';
import UploadVideoLink from './UploadVideoLink';
import FileDisplay from './FileDisplay';
import VideoThumbnailDisplay from './VideoThumbnailDisplay';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class PageMaterials extends Component {
  createFlow = event => {
    event.preventDefault();
    this.props.history.push('/PageFlows');
  };
  render() {
    const { classes } = this.props;
    const isLoggedIn = this.props.userName != null;
    const selectedItems =
      this.props.selectedFiles.length > 0 ||
      this.props.selectedVideos.length > 0;

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
            s3={this.props.s3}
            setSelectedFiles={this.props.setSelectedFiles}
          />
        ) : (
          <div />
        )}
        {isLoggedIn ? (
          <div>
            {selectedItems ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.createFlow}
              >
                Create new flow
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                disabled
                className={classes.button}
              >
                Create new flow
              </Button>
            )}
          </div>
        ) : (
          <div />
        )}
        {isLoggedIn ? (
          <VideoThumbnailDisplay
            userName={this.props.userName}
            setSelectedVideos={this.props.setSelectedVideos}
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

export default withStyles(styles)(PageMaterials);
