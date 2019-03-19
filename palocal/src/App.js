import React, { Component } from 'react';
import AWS from 'aws-sdk';
import bluebird from 'bluebird';
import { BrowserRouter, Route } from 'react-router-dom';
import PageHome from './PageHome';
import PageMaterials from './PageMaterials';
import socketIOClient from 'socket.io-client';
import PagePresentation from './PagePresentation';

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
      socket: socketIOClient('http://localhost:8081/'), //https://paexpress.herokuapp.com/
      userName: sessionStorage.getItem('userName'),
      s3: s3,
      docName: null,
      pageNum: null,
      userType: null,
      videoLink: null,
      selectedFiles: [],
      selectedVideos: []
    };

    this.setUserName = this.setUserName.bind(this);
    this.setDocName = this.setDocName.bind(this);
    this.setPageNum = this.setPageNum.bind(this);
    this.setUserType = this.setUserType.bind(this);
    this.setVideoLink = this.setVideoLink.bind(this);
    this.setSelectedFiles = this.setSelectedFiles.bind(this);
    this.setSelectedVideos = this.setSelectedVideos.bind(this);
  }

  setUserName(userName) {
    this.setState({
      userName: userName
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

  setSelectedFiles(selectedFiles) {
    this.setState({
      selectedFiles: selectedFiles
    });
    console.dir(this.state.selectedFiles);
  }

  setSelectedVideos(selectedVideos) {
    this.setState({
      selectedVideos: selectedVideos
    });
  }

  componentDidMount() {
    document.title = 'SpeechFlow';

    this.state.socket.on('update doc name and page num', (docName, pageNum) => {
      if (docName != null) {
        this.setDocName(docName);
      }
      if (pageNum != null) {
        this.setPageNum(pageNum);
      }
    });

    this.state.socket.on('do you have doc name and page num?', () => {
      if (this.state.docName != null && this.state.pageNum != null) {
        this.state.socket.emit(
          'yes i have them',
          this.state.docName,
          this.state.pageNum
        );
      }
    });
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
                  setDocName={this.setDocName}
                  setPageNum={this.setPageNum}
                  docName={this.state.docName}
                  pageNum={this.state.pageNum}
                  userType={this.state.userType}
                  videoLink={this.state.videoLink}
                  setVideoLink={this.setVideoLink}
                />
              )}
            />
            <Route
              path="/PageMaterials"
              render={props => (
                <PageMaterials
                  {...props}
                  userName={this.state.userName}
                  s3={this.state.s3}
                  setSelectedFiles={this.setSelectedFiles}
                  setSelectedVideos={this.setSelectedVideos}
                />
              )}
            />
          </div>
        </BrowserRouter>
        {/* <PageNonsense data={this.state.data} /> */}
      </div>
    );
  }
}

export default App;
