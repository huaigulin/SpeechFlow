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
      docName: null,
      pageNum: null,
      pdfsList: null,
      videoLink: null,
      videosList: null,
      currentImage: null,
      imagesList: null,
      currentMedia: null
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
      setImagesList,
      setCurrentMedia
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
          sessionStorage.setItem('docName', data.docName);
          setPageNum(data.pageNum);
          sessionStorage.setItem('pageNum', data.pageNum);
          setPdfsList(data.pdfsList);
          sessionStorage.setItem('pdfsList', JSON.stringify(data.pdfsList));
          setVideoLink(data.videoID);
          sessionStorage.setItem('videoID', data.videoID);
          setVideosList(data.videosList);
          sessionStorage.setItem('videosList', JSON.stringify(data.videosList));
          setCurrentImage(data.currentImage);
          sessionStorage.setItem('currentImage', data.currentImage);
          setImagesList(data.imagesList);
          sessionStorage.setItem('imagesList', JSON.stringify(data.imagesList));
          setCurrentMedia(data.currentMedia);
          sessionStorage.setItem('currentMedia', data.currentMedia);
        })
        .catch(error => {
          console.log('Error in react PagePresentation post request: ' + error);
        });
    }
  }

  static getDerivedStateFromProps(props, state) {
    var {
      docName,
      pageNum,
      pdfsList,
      videoLink,
      videosList,
      currentImage,
      imagesList,
      currentMedia
    } = state;
    if (props.docName !== docName) {
      docName = props.docName;
    }
    if (props.pageNum !== pageNum) {
      pageNum = props.pageNum;
    }
    if (props.pdfsList !== pdfsList) {
      pdfsList = props.pdfsList;
    }
    if (props.videoLink !== videoLink) {
      videoLink = props.videoLink;
    }
    if (props.videosList !== videosList) {
      videosList = props.videosList;
    }
    if (props.currentImage !== currentImage) {
      currentImage = props.currentImage;
    }
    if (props.imagesList !== imagesList) {
      imagesList = props.imagesList;
    }
    if (props.currentMedia !== currentMedia) {
      currentMedia = props.currentMedia;
    }
    return {
      docName: docName,
      pageNum: pageNum,
      pdfsList: pdfsList,
      videoLink: videoLink,
      videosList: videosList,
      currentImage: currentImage,
      imagesList: imagesList,
      currentMedia: currentMedia
    };
  }

  goToVideo = event => {
    this.props.socket.emit('video');

    const formData = new FormData();
    formData.append('userName', this.props.userName);
    formData.append('currentMedia', 'video');

    axios
      .post(`/changePresentationMedia`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .catch(error => {
        console.log(
          'Error in react changePresentationMeida post request: ' + error
        );
      });
  };

  goToPdf = event => {
    this.props.socket.emit('pdf');

    const formData = new FormData();
    formData.append('userName', this.props.userName);
    formData.append('currentMedia', 'pdf');

    axios
      .post(`/changePresentationMedia`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .catch(error => {
        console.log(
          'Error in react changePresentationMeida post request: ' + error
        );
      });
  };

  goToGallery = event => {
    this.props.socket.emit('gallery');

    const formData = new FormData();
    formData.append('userName', this.props.userName);
    formData.append('currentMedia', 'gallery');

    axios
      .post(`/changePresentationMedia`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .catch(error => {
        console.log(
          'Error in react changePresentationMeida post request: ' + error
        );
      });
  };

  componentDidMount() {
    this.props.socket.on('video', () => {
      this.props.setCurrentMedia('video');
      sessionStorage.setItem('currentMedia', 'video');
    });

    this.props.socket.on('pdf', () => {
      this.props.setCurrentMedia('pdf');
      sessionStorage.setItem('currentMedia', 'pdf');
    });

    this.props.socket.on('gallery', () => {
      this.props.setCurrentMedia('gallery');
      sessionStorage.setItem('currentMedia', 'gallery');
    });
  }

  render() {
    const isLoggedIn = this.props.userName !== null;
    const { classes } = this.props;

    var pdfsList = this.state.pdfsList;
    if (typeof pdfsList === 'string') {
      pdfsList = JSON.parse(pdfsList);
    }
    var videosList = this.state.videosList;
    if (typeof videosList === 'string') {
      videosList = JSON.parse(videosList);
    }
    var imagesList = this.state.imagesList;
    if (typeof imagesList === 'string') {
      imagesList = JSON.parse(imagesList);
    }

    var loadPDF = false;
    var loadVideo = false;
    var loadGallery = false;

    // update current media
    if (this.state.currentMedia !== null) {
      // started from a flow, or is switching media
      switch (this.state.currentMedia) {
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
        case 'gallery':
          loadPDF = false;
          loadVideo = false;
          loadGallery = true;
          break;
        default:
          console.log('illegal media');
      }
    }

    const hasPdf =
      this.state.docName && this.state.pageNum && this.state.pdfsList;
    const hasVideo = this.state.videoLink && this.state.videosList;
    const hasImage = this.state.currentImage && this.state.imagesList;

    return (
      <div>
        <Navbar
          history={this.props.history}
          userName={this.props.userName}
          profileImageUrl={this.props.profileImageUrl}
          setUserName={this.props.setUserName}
          setProfileImageUrl={this.props.setProfileImageUrl}
          setDocName={this.props.setDocName}
          setPageNum={this.props.setPageNum}
          setPdfsList={this.props.setPdfsList}
          setVideoLink={this.props.setVideoLink}
          setVideosList={this.props.setVideosList}
          setCurrentImage={this.props.setCurrentImage}
          setImagesList={this.props.setImagesList}
          setCurrentMedia={this.props.setCurrentMedia}
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
                {hasPdf ? (
                  <PDFViewer
                    socket={this.props.socket}
                    userName={this.props.userName}
                    setDocName={this.props.setDocName}
                    setPageNum={this.props.setPageNum}
                    docName={this.state.docName}
                    pageNum={this.state.pageNum}
                    userType={this.props.userType}
                    pdfsList={pdfsList}
                  />
                ) : (
                  <div />
                )}
                {hasVideo ? (
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.goToVideo}
                  >
                    Video Player
                  </Button>
                ) : (
                  <div />
                )}
                {hasImage ? (
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.goToGallery}
                  >
                    Image Gallery
                  </Button>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div />
            )}
            {loadVideo ? (
              <div>
                {hasPdf ? (
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.goToPdf}
                  >
                    PDF Viewer
                  </Button>
                ) : (
                  <div />
                )}
                {hasImage ? (
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.goToGallery}
                  >
                    Image Gallery
                  </Button>
                ) : (
                  <div />
                )}
                {hasVideo ? (
                  <div>
                    <VideoPlayer
                      socket={this.props.socket}
                      userName={this.props.userName}
                      userType={this.props.userType}
                      videoLink={this.state.videoLink}
                    />
                    <VideoList
                      userName={this.props.userName}
                      videosList={videosList}
                      socket={this.props.socket}
                      setVideoLink={this.props.setVideoLink}
                    />
                  </div>
                ) : (
                  <div />
                )}
              </div>
            ) : (
              <div />
            )}
            {loadGallery ? (
              <div>
                {hasPdf ? (
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.goToPdf}
                  >
                    PDF Viewer
                  </Button>
                ) : (
                  <div />
                )}
                {hasVideo ? (
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.goToVideo}
                  >
                    Video Player
                  </Button>
                ) : (
                  <div />
                )}
                {hasImage ? (
                  <ImageGallery
                    socket={this.props.socket}
                    userName={this.props.userName}
                    userType={this.props.userType}
                    imagesList={imagesList}
                    currentImage={this.state.currentImage}
                    setCurrentImage={this.props.setCurrentImage}
                  />
                ) : (
                  <div />
                )}
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
