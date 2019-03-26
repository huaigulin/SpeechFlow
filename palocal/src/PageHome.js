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

    // this.handleChange = this.handleChange.bind(this);
    // this.handleRadioChange = this.handleRadioChange.bind(this);
    // this.handleRadioSubmit = this.handleRadioSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ userName: event.target.value });
  // }

  // handleRadioChange(event) {
  //   this.setState({ selectedOption: event.target.value });
  // }

  // handleRadioSubmit(event) {
  //   this.props.socket.emit('login', this.state.userName);
  //   sessionStorage.setItem('userName', this.state.userName);
  //   sessionStorage.setItem('userType', this.state.selectedOption);
  //   this.props.setUserName(this.state.userName);
  //   this.props.setUserType(this.state.selectedOption);
  //   this.props.history.push('/PageMaterials');
  //   event.preventDefault();
  // }

  render() {
    const responseGoogle = response => {
      console.log(response);
    };
    const successCallback = response => {
      this.props.socket.emit('login', response.googleId);
      this.props.setUserName(response.googleId);
      this.props.setUserType('speaker'); // Only speaker has to login in with Google
      sessionStorage.setItem('userName', response.googleId);
      sessionStorage.setItem('userType', 'speaker');
      this.props.history.push('/PageMaterials');
    };
    return (
      <div>
        <Navbar />
        <h1>Welcome to SpeechFlow!</h1>
        To start a new presentation or control your own presentation:
        <br />
        <GoogleLogin
          clientId="205354448545-sc5rs1bo1q8tcdg0crsfr8aiflgf54tp.apps.googleusercontent.com"
          buttonText="Please sign in with Google"
          onSuccess={successCallback}
          onFailure={responseGoogle}
        />
        <br />
        <br />
        To view/control other people's presentation, enter your code below:
        {/* <form onSubmit={this.handleRadioSubmit}>
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
        </form> */}
      </div>
    );
  }
}

export default PageHome;
