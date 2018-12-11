import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
class PageMobileVideo extends Component {


  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the Mobile Video Player</h1>
        <li>
          <Link to="/PageMobilePDF/">Speech Flow Mobile PDF Viewer</Link>
        </li>
        <VideoPlayer socket={this.props.socket}></VideoPlayer>
      </div>
    );
  }
}
export default PageMobileVideo;
