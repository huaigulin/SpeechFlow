import React, { Component } from 'react';
import Flow from './Flow';

class PageFlows extends Component {
  render() {
    const isLoggedIn = this.props.userName != null;
    return (
      <div>
        {isLoggedIn ? (
          <div />
        ) : (
          <h3>You have not logged in. Please log in or sign up.</h3>
        )}
        {isLoggedIn ? (
          <Flow
            userName={this.props.userName}
            s3={this.props.s3}
            selectedFiles={this.props.selectedFiles}
            selectedVideos={this.props.selectedVideos}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default PageFlows;
