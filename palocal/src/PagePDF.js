import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import PdfViewer from './PdfViewer';
//import viewer from './viewer';

const expressAppUrl = 'https://paexpress.herokuapp.com';
class PagePDF extends Component {
  componentDidMount() {
    this.props.socket.on('video', () => {
      this.props.history.push('/PageVideo');
    });
  }

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

  video(socket) {
    console.log('hit video');
    socket.emit('video');
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the PDF Viewer</h1>
        <li
          onClick={() => {
            this.video(this.props.socket);
          }}
        >
          <Link to="/PageVideo/">Speech Flow Video Player</Link>
        </li>
        <h2>This is the controller for PDF</h2>
        <div>
          {' '}
          <PdfViewer socket={this.props.socket} />{' '}
        </div>
        {/* <button onClick={() => {this.handleUpClick(this.props.socket)}}>
          up
        </button>
        <button onClick={() => {this.handleDownClick(this.props.socket)}}>
          down
        </button>
        <button onClick={() => {this.handleLeftClick(this.props.socket)}}>
          left
        </button>
        <button onClick={() => {this.handleRightClick(this.props.socket,"test username")}}>
          login
        </button> */}
      </div>
    );
  }
}
export default PagePDF;
