import React, { Component } from 'react';

class Flow extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPDF: null,
      currentVideo: null
    }
    this.start = this.start.bind(this);
  }

  start(){
    //push to PDF page
  }

  render () {
    var selectedFile = this.state.currentPDF != null
    var selctedVideo = (this.state.currentVideo != null && this.props.selectedVideos.length > 0)
    return (
      <div>
        {selectedFile ? (
          <div>
            <p> user has selcted a file </p>
          </div>
        ) : (
          <div>
            <p> Pick a file to start presentation with </p>
            <p> {this.props.selectedFiles} </p>
            <button onClick={this.start}> Start Presentation </button>
          </div>
        )}
      </div>
    )
  }
}

export default Flow;
