import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import MediaQuery from 'react-responsive';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };

    // this.props.socket.emit('what is video link?');
  }

  componentDidMount() {
    this.props.socket.on('play', () => {
      console.log('recieved play');
      this.setState({ playing: true });
      //this.player.seekTo(parseFloat(time));
    });

    this.props.socket.on('pause', () => {
      console.log('recieved pause');
      this.setState({ playing: false });
      //this.player.seekTo(parseFloat(time));
    });

    // this.props.socket.on('forward', time => {
    //   console.log('recieved forward');
    //   this.setState({ played: time + 5 });
    // });
    //
    // this.props.socket.on('backward', time => {
    //   console.log('recieved backward');
    //   this.setState({ played: time - 5 });
    // });
  }

  handlePlay() {
    console.log('hit play');
    this.props.socket.emit('play');
  }

  handlePause() {
    console.log('hit pause');
    this.props.socket.emit('pause');
  }

  // handleForward(socket, time) {
  //   console.log('hit forward');
  //   socket.emit('forward', time);
  // }
  //
  // handleBackward(socket, time) {
  //   console.log('hit backward');
  //   socket.emit('backward', time);
  // }

  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  onDuration = duration => {
    console.log('onDuration', duration);
    this.setState({ duration });
  };
  ref = player => {
    this.player = player;
  };
  render() {
    const url = 'https://www.youtube.com/watch?v=9j7ANRXsCwc';
    return (
      <div>
        <MediaQuery query="(min-device-width: 1024px)">
          <ReactPlayer
            url={url}
            ref={this.ref}
            playing={this.state.playing}
            controls={true}
            width="1280px"
            height="600px"
            onDuration={this.onDuration}
          />
        </MediaQuery>
        <button
          onClick={() => {
            this.handlePlay();
          }}
        >
          PLAY
        </button>
        <button
          onClick={() => {
            this.handlePause();
          }}
        >
          PAUSE
        </button>
      </div>
    );
  }
}

export default VideoPlayer;
