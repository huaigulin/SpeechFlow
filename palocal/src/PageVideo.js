import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
<<<<<<< HEAD:palocal/src/PageMobileVideo.js
import VideoPlayer from './VideoPlayer';
class PageMobileVideo extends Component {

  componentDidMount(){
    this.props.socket.on('pdf', () => {
      this.props.history.push('/PageMobilePDF');
    })
  }

  pdf(socket){
    console.log('hit pdf');
    socket.emit('pdf');
  }

=======
class PageVideo extends Component {
>>>>>>> master:palocal/src/PageVideo.js
  render() {
    return (
      <div>
        <Navbar />
<<<<<<< HEAD:palocal/src/PageMobileVideo.js
        <h1>This is the Mobile Video Player</h1>
        <li onClick={() => {this.pdf(this.props.socket)}}>
          <Link to="/PageMobilePDF/">Speech Flow Mobile PDF Viewer</Link>
=======
        <h1>This is the Video Player</h1>
        <li>
          <Link to="/PagePDF/">Speech Flow PDF Viewer</Link>
>>>>>>> master:palocal/src/PageVideo.js
        </li>
        <VideoPlayer socket={this.props.socket}></VideoPlayer>
      </div>
    );
  }
}
export default PageVideo;
