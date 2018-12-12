import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import PdfViewer from './PdfViewer';
//import viewer from './viewer';

class PagePDF extends Component {
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

  handleRightClick(socket, username) {
    console.log('hit login');
    socket.emit('login', username);
  }

  render() {
    return (
      <div>
        <Navbar />
        <li>
          <Link to="/PageVideo/">Speech Flow Video Player</Link>
        </li>
        <h1>This is the PDF Viewer</h1>
        <div>
          {' '}
          <PdfViewer socket={this.props.socket} />{' '}
        </div>
        <button
          onClick={() => {
            this.handleUpClick(this.props.socket);
          }}
        >
          up
        </button>
        <button
          onClick={() => {
            this.handleDownClick(this.props.socket);
          }}
        >
          down
        </button>
        <button
          onClick={() => {
            this.handleLeftClick(this.props.socket);
          }}
        >
          left
        </button>
        <button
          onClick={() => {
            this.handleRightClick(this.props.socket, 'test username');
          }}
        >
          login
        </button>
      </div>
    );
  }
}
export default PagePDF;
