import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PageHome from './PageHome';
import PageMaterials from './PageMaterials';
import socketIOClient from 'socket.io-client';
import PagePresentation from './PagePresentation';
// import PageNonsense from './PageNonsense';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageFromSocketServer: null,
      socket: socketIOClient('https://paexpress.herokuapp.com/'),
      userName: null,
      docName: null,
      pageNum: null,
      userType: null,
      videoLink: null
    };

    this.setUserName = this.setUserName.bind(this);
    this.setDocName = this.setDocName.bind(this);
    this.setPageNum = this.setPageNum.bind(this);
    this.setUserType = this.setUserType.bind(this);
    this.setVideoLink = this.setVideoLink.bind(this);
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
                  messageFromSocketServer={this.state.messageFromSocketServer}
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
                  socket={this.state.socket}
                  userName={this.state.userName}
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
