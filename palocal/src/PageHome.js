import React, { Component } from 'react';
import Navbar from './Navbar';
import GoogleLogin from 'react-google-login';
// import VideoPlayer from './VideoPlayer';

class PageHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      userName: '',
      userType: '',
      selectedOption: 'speaker'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleRadioSubmit = this.handleRadioSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ userName: event.target.value });
  }

  handleRadioChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  handleRadioSubmit(event) {
    this.props.socket.emit('login', this.state.userName);
    event.preventDefault();
    this.props.history.push('/PagePDF');
    this.props.setUserName(this.state.userName);
    this.props.setUserType(this.state.selectedOption);
  }

  render() {
    const responseGoogle = response => {
      console.log(response);
    };
    const googleID = response => {
      console.log(response.googleId);
      this.props.socket.emit('login', response.googleId);
      this.props.history.push('/PagePDF');
      this.props.setUserName(response.googleId);
    };
    return (
      <div>
        <GoogleLogin
          clientId="205354448545-sc5rs1bo1q8tcdg0crsfr8aiflgf54tp.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={googleID}
          onFailure={responseGoogle}
        />
        <Navbar />
        <h1>This is the home page</h1>
        <p>{this.props.data}</p>
        <p>{this.props.messageFromSocketServer}</p>
        <form onSubmit={this.handleRadioSubmit}>
          <label>
            User name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="speaker"
                checked={this.state.selectedOption === 'speaker'}
                onChange={this.handleRadioChange}
              />
              Speaker
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="listener"
                checked={this.state.selectedOption === 'listener'}
                onChange={this.handleRadioChange}
              />
              Listener
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
        {/* <VideoPlayer /> */}
      </div>
    );
  }
}

export default PageHome;
