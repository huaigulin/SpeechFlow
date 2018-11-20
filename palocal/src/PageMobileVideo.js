import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
class PageMobileVideo extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the Mobile Video Player</h1>
        <li>
          <Link to="/PageMobilePDF/">Speech Flow Mobile PDF Viewer</Link>
        </li>
        <h2>This is the controller for Video Player</h2>
        <button>PLAY</button>
        <button>PAUSE</button>
        <button>FORWARD</button>
        <button>BACKWARD</button>
      </div>
    );
  }
}
export default PageMobileVideo;
