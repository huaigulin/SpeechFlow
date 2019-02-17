import React, { Component } from 'react';
import PDFViewer from './PDFViewer';
import VideoPlayer from './VideoPlayer';
import Navbar from './Navbar';

class PagePresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadPDF: true,
      loadVideo: false,
      loadGallery: false
    };
  }

  render() {
    const isLoggedIn = this.props.userName != null;
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
              </div>
            ) : (
              <div />
            )}
            {loadVideo ? (
              <VideoPlayer
                socket={this.props.socket}
                userName={this.props.userName}
                userType={this.props.userType}
                videoLink={this.props.videoLink}
              />
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

export default PagePresentation;
