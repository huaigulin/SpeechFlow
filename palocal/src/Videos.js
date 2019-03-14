import React, { Component } from 'react';
import axios from 'axios';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    };
    this.getThumbnails = this.getThumbnails.bind(this);
    this.getThumbnails(this.props.userName);
  }

  getThumbnails(userName) {
    const formData = new FormData();
    formData.append('userName', this.props.userName);
    axios
      .post(`/getThumbnails`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.setState({ urls: response.data });
      })
      .catch(error => {
        console.log('ERROR in getThumbnails post request: ' + error);
      });
  }

  render() {
    var urls = this.state.urls;
    var thumnails = [];
    for (var i = 0; i < urls.length; i++) {
      thumnails.push(<img src={urls[i]} alt="video thumnail" />);
    }
    return (
      <div>
        <h5>Your Videos:</h5>
        <tbody>{thumnails}</tbody>
      </div>
    );
  }
}

export default Videos;
