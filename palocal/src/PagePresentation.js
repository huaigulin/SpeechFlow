import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PDFViewer from './PDFViewer';
import VideoPlayer from './VideoPlayer';
import Navbar from './Navbar';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class PagePresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPDF: true,
      loadVideo: false,
      loadGallery: false
    };
  }

  goToVideo = event => {
    this.setState({ loadPDF: false });
    this.setState({ loadVideo: true });
    this.setState({ loadGallery: false });
    this.props.socket.emit('video');
  };

  goToPdf = event => {
    this.setState({ loadPDF: true });
    this.setState({ loadVideo: false });
    this.setState({ loadGallery: false });
    this.props.socket.emit('pdf');
  };

  componentDidMount() {
    this.props.socket.on('video', () => {
      this.setState({ loadPDF: false });
      this.setState({ loadVideo: true });
      this.setState({ loadGallery: false });
    });

    this.props.socket.on('pdf', () => {
      this.setState({ loadPDF: true });
      this.setState({ loadVideo: false });
      this.setState({ loadGallery: false });
    });
  }

  render() {
    const isLoggedIn = this.props.userName != null;
    const { classes } = this.props;
    var loadPDF = this.state.loadPDF;
    var loadVideo = this.state.loadVideo;
    var loadGallery = this.state.loadGallery;

    return (
      <div>
        <Navbar />
        {isLoggedIn ? (
          <div />
        ) : (
          <h3>You have not logged in. Please log in or sign up.</h3>
        )}
        {isLoggedIn ? (
          <div>
            {loadPDF ? (
              <div>
                <PDFViewer
                  socket={this.props.socket}
                  userName={this.props.userName}
                  setDocName={this.props.setDocName}
                  setPageNum={this.props.setPageNum}
                  docName={this.props.docName}
                  pageNum={this.props.pageNum}
                  userType={this.props.userType}
                />
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.goToVideo}
                >
                  Video Player
                </Button>
              </div>
            ) : (
              <div />
            )}
            {loadVideo ? (
              <div>
                <VideoPlayer
                  socket={this.props.socket}
                  userName={this.props.userName}
                  userType={this.props.userType}
                  videoLink={this.props.videoLink}
                />
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.goToPdf}
                >
                  PDF Viewer
                </Button>
              </div>
            ) : (
              <div />
            )}
            {loadGallery ? <div /> : <div />}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PagePresentation);
