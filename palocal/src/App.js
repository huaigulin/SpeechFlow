import React, { Component } from 'react';
import AWS from 'aws-sdk';
import bluebird from 'bluebird';
import { BrowserRouter, Route } from 'react-router-dom';
import PageHome from './PageHome';
import PageMaterials from './PageMaterials';
import PagePresentation from './PagePresentation';
import PageFlows from './PageFlows';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    AWS.config.setPromisesDependency(bluebird);
    AWS.config.update({
      accessKeyId: 'AKIAJ2AJSWCEWUVGAXUQ', //process.env.AWS_KEY,
      secretAccessKey: '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' //process.env.AWS_SECRET
    });
    const s3 = new AWS.S3();

    this.state = {
      // socket: socketIOClient('https://paexpress.herokuapp.com/'),
      socket: socketIOClient('http://localhost:8081/'),
      s3: s3,
      userName: sessionStorage.getItem('userName'),
      profileImageUrl: sessionStorage.getItem('profileImageUrl'),
      docName: sessionStorage.getItem('docName'),
      pageNum: parseInt(sessionStorage.getItem('pageNum')),
      userType: sessionStorage.getItem('userType'),
      videoLink: sessionStorage.getItem('videoID'),
      currentImage: sessionStorage.getItem('currentImage'),
      pdfsList: sessionStorage.getItem('pdfsList'),
      videosList: sessionStorage.getItem('videosList'),
      imagesList: sessionStorage.getItem('imagesList'),
      currentMedia: sessionStorage.getItem('currentMedia'),
      selectedFiles: [],
      selectedVideos: []
    };

    this.setUserName = this.setUserName.bind(this);
    this.setProfileImageUrl = this.setProfileImageUrl.bind(this);
    this.setDocName = this.setDocName.bind(this);
    this.setPageNum = this.setPageNum.bind(this);
    this.setUserType = this.setUserType.bind(this);
    this.setVideoLink = this.setVideoLink.bind(this);
    this.setCurrentImage = this.setCurrentImage.bind(this);
    this.setPdfsList = this.setPdfsList.bind(this);
    this.setVideosList = this.setVideosList.bind(this);
    this.setImagesList = this.setImagesList.bind(this);
    this.setCurrentMedia = this.setCurrentMedia.bind(this);
    this.setSelectedFiles = this.setSelectedFiles.bind(this);
    this.setSelectedVideos = this.setSelectedVideos.bind(this);
  }

  setUserName(userName) {
    this.setState({
      userName: userName
    });
  }

  setProfileImageUrl(profileImageUrl) {
    this.setState({
      profileImageUrl: profileImageUrl
    });
  }

  setDocName(docName) {
    this.setState({
      docName: docName
    });
  }

  setPageNum(pageNum) {
    this.setState({
      pageNum: pageNum
    });
  }

  setUserType(userType) {
    this.setState({
      userType: userType
    });
  }

  setVideoLink(videoLink) {
    this.setState({
      videoLink: videoLink
    });
  }

  setCurrentImage(currentImage) {
    this.setState({
      currentImage: currentImage
    });
  }

  setPdfsList(pdfsList) {
    this.setState({
      pdfsList: pdfsList
    });
  }

  setVideosList(videosList) {
    this.setState({
      videosList: videosList
    });
  }

  setImagesList(imagesList) {
    this.setState({
      imagesList: imagesList
    });
  }

  setCurrentMedia(currentMedia) {
    this.setState({
      currentMedia: currentMedia
    });
  }

  setSelectedFiles(selectedFiles) {
    this.setState({
      selectedFiles: selectedFiles
    });
  }

  setSelectedVideos(selectedVideos) {
    this.setState({
      selectedVideos: selectedVideos
    });
  }

  componentDidMount() {
    document.title = 'SpeechFlow';

    // this.state.socket.on('update doc name and page num', (docName, pageNum) => {
    //   if (docName != null) {
    //     this.setDocName(docName);
    //   }
    //   if (pageNum != null) {
    //     this.setPageNum(pageNum);
    //   }
    // });

    // this.state.socket.on('update video link', videoLink => {
    //   if (videoLink != null) {
    //     this.setVideoLink(videoLink);
    //   }
    // });

    // this.state.socket.on('do you have doc name and page num?', () => {
    //   if (this.state.docName != null && !this.state.pageNum.isNaN) {
    //     // console.log(this.state.docName);
    //     // console.log(this.state.pageNum);
    //     this.state.socket.emit(
    //       'yes i have them',
    //       this.state.docName,
    //       this.state.pageNum
    //     );
    //   }
    // });

    // this.state.socket.on('do you have video link?', () => {
    //   if (this.state.videoLink != null) {
    //     this.state.socket.emit('yes i have video link', this.state.videoLink);
    //   }
    // });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route
              exact
              path="/"
              render={props => (
                <PageHome
                  {...props}
                  socket={this.state.socket}
                  setUserName={this.setUserName}
                  setUserType={this.setUserType}
                  setProfileImageUrl={this.setProfileImageUrl}
                  docName={this.state.docName}
                  pageNum={this.state.pageNum}
                />
              )}
            />
            <Route
              path="/PagePresentation"
              render={props => (
                <PagePresentation
                  {...props}
                  socket={this.state.socket}
                  userName={this.state.userName}
                  userType={this.state.userType}
                  profileImageUrl={this.state.profileImageUrl}
                  docName={this.state.docName}
                  pageNum={this.state.pageNum}
                  pdfsList={this.state.pdfsList}
                  videoLink={this.state.videoLink}
                  videosList={this.state.videosList}
                  currentImage={this.state.currentImage}
                  imagesList={this.state.imagesList}
                  setDocName={this.setDocName}
                  setPageNum={this.setPageNum}
                  setPdfsList={this.setPdfsList}
                  setVideoLink={this.setVideoLink}
                  setVideosList={this.setVideosList}
                  setCurrentImage={this.setCurrentImage}
                  setImagesList={this.setImagesList}
                  setCurrentMedia={this.setCurrentMedia}
                  currentMedia={this.state.currentMedia}
                />
              )}
            />
            <Route
              path="/PageMaterials"
              render={props => (
                <PageMaterials
                  {...props}
                  userName={this.state.userName}
                  profileImageUrl={this.state.profileImageUrl}
                  s3={this.state.s3}
                  setSelectedFiles={this.setSelectedFiles}
                  setSelectedVideos={this.setSelectedVideos}
                  selectedFiles={this.state.selectedFiles}
                  selectedVideos={this.state.selectedVideos}
                />
              )}
            />
            <Route
              path="/PageFlows"
              render={props => (
                <PageFlows
                  {...props}
                  userName={this.state.userName}
                  profileImageUrl={this.state.profileImageUrl}
                  s3={this.state.s3}
                  setDocName={this.setDocName}
                  setPageNum={this.setPageNum}
                  setVideoLink={this.setVideoLink}
                  setCurrentImage={this.setCurrentImage}
                  setPdfsList={this.setPdfsList}
                  setVideosList={this.setVideosList}
                  setImagesList={this.setImagesList}
                  setCurrentMedia={this.setCurrentMedia}
                />
              )}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
