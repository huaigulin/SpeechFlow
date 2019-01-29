import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PageHome from './PageHome';
import PageLogin from './PageLogin';
import PagePDF from './PagePDF';
import PageVideo from './PageVideo';
import socketIOClient from 'socket.io-client';
// import PageNonsense from './PageNonsense';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      messageFromSocketServer: null,
      socket: socketIOClient('https://paexpress.herokuapp.com/'),
      userName: null,
      docName: null,
      pageNum: null
    };

    this.setUserName = this.setUserName.bind(this);
    this.setDocName = this.setDocName.bind(this);
    this.setPageNum = this.setPageNum.bind(this);
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
        console.log('Yes I have them: ');
        console.log(this.state.docName);
        console.log(this.state.pageNum);
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
                  data={this.state.data}
                  messageFromSocketServer={this.state.messageFromSocketServer}
                  setUserName={this.setUserName}
                />
              )}
            />
            <Route
              path="/login"
              render={props => <PageLogin {...props} data={this.state.data} />}
            />
            <Route
              path="/PagePDF"
              render={props => (
                <PagePDF
                  {...props}
                  socket={this.state.socket}
                  data={this.state.data}
                  userName={this.state.userName}
                  setDocName={this.setDocName}
                  setPageNum={this.setPageNum}
                  docName={this.state.docName}
                  pageNum={this.state.pageNum}
                />
              )}
            />
            <Route
              path="/PageVideo"
              render={props => (
                <PageVideo
                  {...props}
                  data={this.state.data}
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
