import React, { Component } from 'react';
import Navbar from './Navbar';
import VideoPlayer from './VideoPlayer';

class PageHome extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the home page</h1>
        <p>{this.props.data}</p>
        <p>{this.props.messageFromSocketServer}</p>
        {/* <VideoPlayer /> */}
      </div>
    );
  }
}

export default PageHome;
