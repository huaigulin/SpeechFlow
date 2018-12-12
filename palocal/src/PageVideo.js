import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
class PageVideo extends Component {

  componentDidMount(){
    this.props.socket.on('pdf', () => {
      this.props.history.push('/PagePDF');
    })
  }

  pdf(socket){
    console.log('hit pdf');
    socket.emit('pdf');
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the Mobile Video Player</h1>
        <li onClick={() => {this.pdf(this.props.socket)}}>
          <Link to="/PagePDF/">Speech Flow Mobile PDF Viewer</Link>
        </li>
        <VideoPlayer socket={this.props.socket}></VideoPlayer>
      </div>
    );
  }
}
export default PageVideo;
