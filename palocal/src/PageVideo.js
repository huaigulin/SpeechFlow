import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
class PageVideo extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the Video Player</h1>
        <li>
          <Link to="/PagePDF/">Speech Flow PDF Viewer</Link>
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
export default PageVideo;
