import React, { Component } from 'react';
import axios from 'axios';

class Videos extends Component {

  constructor(props){
    super(props);
    this.state = {
      urls: []
    }
    this.getThumbnails = this.getThumbnails.bind(this);
    this.getThumbnails(this.props.userName);
  }

  getThumbnails(userName){
    const formData = new FormData();
    formData.append('userName', this.props.userName);
    axios
      .post(`/getThumbnails`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log(response.data)
        this.setState({urls: response.data})
      })
      .catch(error => {
        console.log('ERROR in getThumbnails post request: ' + error);
      });
  }

  renderThumbnails = (urls) => {
    let images = [];
    for (var i=0; i<urls.length; i++){
      images.push(<img src=urls[i]/>)
    }
    return images;
  }

  render() {
    //let images = this.renderThumbnails(this.state.urls);
    return (
      <div>
        <img src={this.state.urls[0]} />
      </div>
    )
  }
}

export default Videos;
