import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
class PageVideo extends Component {
  componentDidMount() {
    this.props.socket.on('pdf', () => {
      this.props.history.push('/PagePresentation');
    });
  }

  pdf(socket) {
    console.log('hit pdf');
    socket.emit('pdf');
  }

  render() {
    return (
      <div>
        <Navbar />
        <li
          onClick={() => {
            this.pdf(this.props.socket);
          }}
        >
          <Link to="/PagePresentation/">Speech Flow PDF Viewer</Link>
        </li>
        <VideoPlayer socket={this.props.socket} />
      </div>
    );
  }
}
export default PageVideo;
