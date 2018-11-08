import React, { Component } from 'react';
import Table from './Table';
import VideoPlayer from './VideoPlayer';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    const people = [
      {
        name: 'Sam Ruditsky',
        role: 'Super Smart Student'
      },
      {
        name: 'Joseph Kim',
        role: 'Super Smart Student'
      },
      {
        name: 'Huaigu Lin',
        role: 'Super Smart Student'
      },
      {
        name: 'Tim Hickey',
        role: 'BestProfessor'
      }
    ];
    return (
      <div className="container">
        <Table peopleData={people} />
        <p className="App-intro">{this.state.data}</p>
        <VideoPlayer />
      </div>
    );
  }
}

export default App;
