import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PDFViewer from './PDFViewer';
import VideoPlayer from './VideoPlayer';
import VideoList from './VideoList';
import ImageGallery from './ImageGallery';
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
      loadPDF: false,
      loadVideo: false,
      loadGallery: false
    };

    this.props.socket.emit('login', this.props.userName);

    const {
      docName,
      // pageNum,
      // pdfsList,
      videoLink,
      // videosList,
      currentImage,
      // imagesList,
      setDocName,
      setPageNum,
      setPdfsList,
      setVideoLink,
      setVideosList,
      setCurrentImage,
      setImagesList
    } = props;

    if (docName === null && videoLink === null && currentImage === null) {
      // new client
      const formData = new FormData();
      formData.append('userName', this.props.userName);
      axios
        .post(`/getPresentation`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          const data = response.data;
          setDocName(data.docName);
          setPageNum(data.pageNum);
          setPdfsList(data.pdfsList);
          setVideoLink(data.videoID);
          setVideosList(data.videosList);
          setCurrentImage(data.currentImage);
          setImagesList(data.imagesList);
        })
        .catch(error => {
          console.log('Error in PagePresentation post request: ' + error);
        });
    }
  }

  goToVideo = event => {
    this.props.socket.emit('video');
  };

  goToPdf = event => {
    this.props.socket.emit('pdf');
  };

  goToGallery = event => {
    this.props.socket.emit('gallery');
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

    this.props.socket.on('gallery', () => {
      this.setState({ loadPDF: false });
      this.setState({ loadVideo: false });
      this.setState({ loadGallery: true });
    });
  }

  render() {
    const isLoggedIn = this.props.userName != null;
    var isDocNameValid = this.props.docName != null;
    const { classes } = this.props;

    var loadPDF = false;
    var loadVideo = false;
    var loadGallery = false;

    // update current media
    if (this.props.currentMedia === null) {
      // new client
      const formData = new FormData();
      formData.append('userName', this.props.userName);
      axios
        .post(`/getPresentation`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          const data = response.data;
          switch (data.currentMedia) {
            case 'pdf':
              this.props.setCurrentMedia('pdf');
              break;
            case 'video':
              this.props.setCurrentMedia('video');
              break;
            case 'image':
              this.props.setCurrentMedia('image');
              break;
            default:
              console.log('illegal media');
          }
        })
        .catch(error => {
          console.log('Error in PagePresentation post request: ' + error);
        });
    } else {
      // started from a flow
      switch (this.props.currentMedia) {
        case 'pdf':
          loadPDF = true;
          loadVideo = false;
          loadGallery = false;
          break;
        case 'video':
          loadPDF = false;
          loadVideo = true;
          loadGallery = false;
          break;
        case 'image':
          loadPDF = false;
          loadVideo = false;
          loadGallery = true;
          break;
        default:
          console.log('illegal media');
      }
    }

    return (
      <div>
        <Navbar
          history={this.props.history}
          userName={this.props.userName}
          profileImageUrl={this.props.profileImageUrl}
        />
        {isLoggedIn ? (
          <div />
        ) : (
          <h3>You have not logged in. Please go to Home to sign in.</h3>
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
                {isDocNameValid ? (
                  <div>
                    <Button
                      color="primary"
                      className={classes.button}
                      onClick={this.goToVideo}
                    >
                      Video Player
                    </Button>
                    <Button
                      color="primary"
                      className={classes.button}
                      onClick={this.goToGallery}
                    >
                      ImageGallery
                    </Button>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div />
            )}
            {loadVideo ? (
              <div>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.goToPdf}
                >
                  PDF Viewer
                </Button>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.goToGallery}
                >
                  ImageGallery
                </Button>
                <VideoPlayer
                  socket={this.props.socket}
                  userName={this.props.userName}
                  userType={this.props.userType}
                  videoLink={this.props.videoLink}
                />
                <VideoList videosList={this.props.videosList} />
              </div>
            ) : (
              <div />
            )}
            {loadGallery ? (
              <div>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.goToPdf}
                >
                  PDF Viewer
                </Button>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={this.goToVideo}
                >
                  Video Player
                </Button>
                <ImageGallery
                  socket={this.props.socket}
                  userName={this.props.userName}
                  userType={this.props.userType}
                  videoLink={this.props.videoLink}
                  imagesList={this.props.imagesList}
                  currentImage={this.props.currentImage}
                />
              </div>
            ) : (
              <div />
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PagePresentation);
