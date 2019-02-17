import React, { Component } from 'react';
import UploadPDFAndImage from './UploadPDFAndImage';
import Navbar from './Navbar';

class PageMaterials extends Component {
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
          <UploadPDFAndImage userName={this.props.userName} />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default PageMaterials;
