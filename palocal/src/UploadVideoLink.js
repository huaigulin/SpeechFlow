import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios';

class UploadVideoLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null
    };
  }

  handleLinkChange = event => {
    this.setState({ link: event.target.value });
  };

  submitLink = event => {
    const formData = new FormData();
    formData.append('userName', this.props.userName);
    formData.append('link', this.state.link);
    axios
      .post(`/upload-video-link`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        document.getElementById('SubmitLink').reset();
      })
      .catch(error => {
        console.log('ERROR in UploadVideoLink post request: ' + error);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1024px)">
          <form id="SubmitLink" onSubmit={this.submitLink}>
            <label>
              Upload your video links:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleLinkChange}
              />
            </label>
            <input type="submit" value="Upload" />
          </form>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1023px)">
          <div />
        </MediaQuery>
      </div>
    );
  }
}

export default UploadVideoLink;
