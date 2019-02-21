import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import axios from 'axios';

class UploadPDFAndImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file[0]);
    formData.append('userName', this.props.userName);
    axios
      .post(`/upload-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        document.getElementById('SubmitFile').reset();
      })
      .catch(error => {
        console.log('ERROR in react UploadPDFAndImage post request: ' + error);
      });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1024px)">
          <form id="SubmitFile" onSubmit={this.submitFile}>
            <h5>Upload your PDF and images:</h5>
            <input
              label="upload file"
              type="file"
              accept="application/pdf, image/*"
              onChange={this.handleFileUpload}
            />
            <button type="submit">Upload</button>
          </form>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1023px)">
          <br />
        </MediaQuery>
      </div>
    );
  }
}

export default UploadPDFAndImage;
