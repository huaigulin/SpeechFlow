import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends Component {

  state = {
    playing: true
  };

  componentDidMount(){
    this.props.socket.on('play', () => {
      console.log('recieved play');
      this.setState({playing: true})
    });

    this.props.socket.on('pause', () => {
      console.log('recieved pause');
      this.setState({playing: false});
    });
  }

  componentWillUnmount() {
    this.props.socket.removeListener('play');
    this.props.socket.removeListener('pause');
  }

  handlePlay(socket) {
    console.log('hit play');
    socket.emit('play');
  }

  handlePause(socket) {
    console.log('hit pause');
    socket.emit('pause');
  }

  handleForward(socket) {
    console.log('hit forward');
    socket.emit('forward');
  }

  handleBackward(socket,username) {
    console.log('hit backward');
    socket.emit('backward');
  }

  render() {
    return (
    <div>
      <ReactPlayer
        url="http://www.youtube.com/watch?v=bESGLojNYSo"
        playing={this.state.playing}
        controls={true}
        width="1280px"
        height="720px"
      />
      <h2>This is the controller for Video Player</h2>
      <button onClick={() => {this.handlePlay(this.props.socket)}}>PLAY</button>
      <button onClick={() => {this.handlePause(this.props.socket)}}>PAUSE</button>
      <button onClick={() => {this.handleForward(this.props.socket)}}>FORWARD</button>
      <button onClick={() => {this.handleBackward(this.props.socket)}}>BACKWARD</button>
    </div>

    );
  }
}

export default VideoPlayer;
