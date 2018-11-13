import React, { Component } from 'react';
import Table from './Table';
import VideoPlayer from './VideoPlayer';

class PageNonsense extends Component {
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
      <div>
        <div className="container">
          <Table peopleData={people} />
          <p className="App-intro">{this.props.data}</p>
          <VideoPlayer />
        </div>
      </div>
    );
  }
}

export default PageNonsense;
