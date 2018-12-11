import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class VideoPlayer extends Component {

  state = {
    url: null,
    pip: false,
    playing: true,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  componentDidMount(){
    this.props.socket.on('play', time => {
      console.log('recieved play');
      console.log('time: '+ time)
      console.dir(this.player)
      this.setState({playing: true, played: time});
      //this.player.seekTo(parseFloat(time));
    });

    this.props.socket.on('pause', time => {
      console.log('recieved pause');
      this.setState({playing: false, played: time});
      //this.player.seekTo(parseFloat(time));
    });

    this.props.socket.on('forward', time => {
      console.log('recieved forward');
      this.setState({played: time+5});
    })
  }

  componentWillUnmount() {
    this.props.socket.removeListener('play');
    this.props.socket.removeListener('pause');
  }

  handlePlay(socket,time) {
    console.log('hit play');
    socket.emit('play',time);
  }

  handlePause(socket,time) {
    console.log('hit pause');
    socket.emit('pause',time);
  }

  handleForward(socket, time) {
    console.log('hit forward');
    socket.emit('forward',time);
  }

  handleBackward(socket,username) {
    console.log('hit backward');
    socket.emit('backward');
  }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  onDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }
  ref = player => {
   this.player = player
  }
  render() {
    return (
    <div>
      <ReactPlayer
        url="http://www.youtube.com/watch?v=bESGLojNYSo"
        ref={this.ref}
        playing={this.state.playing}
        controls={true}
        width="1280px"
        height="720px"
        onDuration={this.onDuration}
      />
      <h2>This is the controller for Video Player</h2>
      <button onClick={() => {this.handlePlay(this.props.socket,this.player.getCurrentTime())}}>PLAY</button>
      <button onClick={() => {this.handlePause(this.props.socket,this.player.getCurrentTime())}}>PAUSE</button>
      <button onClick={() => {this.handleForward(this.props.socket,this.player.getCurrentTime())}}>FORWARD</button>
      <button onClick={() => {this.handleBackward(this.props.socket,this.player.getCurrentTime())}}>BACKWARD</button>
    </div>

    );
  }
}

export default VideoPlayer;
