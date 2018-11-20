import React, { Component } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
class PageMobilePDF extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    axios
      .post('http://129.64.146.120:8081/get', {
        msg: 'send'
      })
      .then(response => {
        console.log('hello');
      })
      .catch(error => {
        if (error.repsonse) {
          console.log('error', error.message);
        }
        console.log(error.config);
      });
  }
  //    handleClick () {
  //        axios.get('https://api.github.com/users/maecapozzi')
  //          .then(response => this.setState({username: response.data.name}))
  //      }
  render() {
    return (
      <div>
        <Navbar />
        <h1>This is the Mobile PDF Viewer</h1>
        <li>
          <Link to="/PageMobileVideo/">Speech Flow Mobile Video Player</Link>
        </li>
        <h2>This is the controller for PDF</h2>
        <button className="upButton" onClick={this.handleClick}>
          up
        </button>
        <button>down</button>
        <button>right</button>
        <button>left</button>
        <p>{this.state.username}</p>
      </div>
    );
  }
}
export default PageMobilePDF;
