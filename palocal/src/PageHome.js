import React, { Component } from 'react';
import Navbar from './Navbar';

class PageHome extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the home page</h1>
        <p>{this.props.data}</p>
      </div>
    );
  }
}

export default PageHome;
