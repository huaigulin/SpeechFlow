import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PDFViewer from './PDFViewer';
import Navbar from './Navbar';
import FileUpload from './FileUpload';

class PagePresentation extends Component {
  render() {
    const isLoggedIn = this.props.userName != null;
    return (
      <div>
        <Navbar />
        {isLoggedIn ? (
          <div />
        ) : (
          <h3>You have not logged in. Please log in or sign up.</h3>
        )}
        {isLoggedIn ? (
          <PDFViewer
            socket={this.props.socket}
            userName={this.props.userName}
            setDocName={this.props.setDocName}
            setPageNum={this.props.setPageNum}
            docName={this.props.docName}
            pageNum={this.props.pageNum}
            userType={this.props.userType}
          />
        ) : (
          <div />
        )}
        {isLoggedIn ? <FileUpload userName={this.props.userName} /> : <div />}
        {isLoggedIn ? (
          <li
            onClick={() => {
              this.props.socket.emit('video');
            }}
          >
            <Link to="/PageVideo/">Speech Flow Video Player</Link>
          </li>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default PagePresentation;
