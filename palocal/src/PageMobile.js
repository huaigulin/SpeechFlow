import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

class PageMobile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the mobile page</h1>
        <li>
          <Link to="/PageMobilePDF/">Speech Flow Mobile PDF Viewer</Link>
        </li>
        <li>
          <Link to="/PageMobileVideo/">Speech Flow Mobile Video Player</Link>
        </li>
      </div>
    );
  }
}

export default PageMobile;
