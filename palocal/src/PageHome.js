import React, { Component } from 'react';
import Navbar from './Navbar';
import VideoPlayer from './VideoPlayer';

class PageHome extends Component {
  constructor(props) {
    super(props);
    this.state = { socket: null, userName: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userName: event.target.value });
    this.setState({ socket: this.props.socket });
  }

  handleSubmit(event) {
    this.state.socket.emit('login', this.state.userName);
    event.preventDefault();
    this.props.history.push('/PageMobilePDF');
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the home page</h1>
        <p>{this.props.data}</p>
        <p>{this.props.messageFromSocketServer}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            User name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/* <VideoPlayer /> */}
      </div>
    );
  }
}

export default PageHome;
