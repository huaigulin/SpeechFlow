import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const expressAppUrl = 'https://paexpress.herokuapp.com';
class PageMobilePDF extends Component {
  handleUpClick() {
    axios
      .post(expressAppUrl + '/pdfCommands', {
        msg: 'pdfUp'
      })
      .then(response => {
        console.log('pdf UP command');
      })
      .catch(error => {
        if (error.repsonse) {
          console.log('UP click error', error.message);
        }
        console.log(error.config);
      });
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the Mobile PDF Viewer</h1>
        <li>
          <Link to="/PageMobileVideo/">Speech Flow Mobile Video Player</Link>
        </li>
        <h2>This is the controller for PDF</h2>
        <button className="upButton" onClick={this.handleUpClick}>
          up
        </button>
        <button>down</button>
        <button>right</button>
        <button>left</button>
      </div>
    );
  }
}
export default PageMobilePDF;
