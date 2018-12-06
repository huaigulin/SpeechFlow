import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import PdfViewer from './PdfViewer';
//import viewer from './viewer';

const expressAppUrl = 'https://paexpress.herokuapp.com';
class PageMobilePDF extends Component {


  handleUpClick(socket) {
    console.log('hit up');
    socket.emit('up click');
  }

  handleDownClick(socket) {
    console.log('hit down');
    socket.emit('down click');
  }

  handleLeftClick(socket) {
    console.log('hit left');
    socket.emit('left click');
  }

  handleRightClick(socket) {
    console.log('hit right');
    socket.emit('right click');
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
        <div> <PdfViewer socket={this.props.socket}/> </div>
        <button onClick={() => {this.handleUpClick(this.props.socket)}}>
          up
        </button>
        <button onClick={() => {this.handleDownClick(this.props.socket)}}>
          down
        </button>
        <button onClick={() => {this.handleLeftClick(this.props.socket)}}>
          left
        </button>
        <button onClick={() => {this.handleRightClick(this.props.socket)}}>
          right
        </button>
      </div>

    );
  }
}
export default PageMobilePDF;
