import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from './Navbar';
import Flow from './Flow';

class PageFlows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flowComponents: []
    };
    this.getFlows = this.getFlows.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.getFlows(this.props.userName);
  }

  getFlows(userName) {
    const formData = new FormData();
    formData.append('userName', userName);
    axios
      .post(`/getFlows`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        var flows = response.data;
        var flowComponents = [];
        for (var i = 0; i < flows.length; i++) {
          flowComponents.push(
            <Flow
              userName={this.props.userName}
              flowName={flows[i].flowName}
              flowID={flows[i].id}
              pdfs={flows[i].pdfs}
              images={flows[i].images}
              videos={flows[i].videos}
              key={i}
            />
          );
        }
        this.setState({ flowComponents: flowComponents });
      });
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  };

  render() {
    const isLoggedIn = this.props.userName != null;
    return (
      <div>
        <Navbar
          history={this.props.history}
          userName={this.props.userName}
          profileImageUrl={this.props.profileImageUrl}
        />
        {isLoggedIn ? (
          <div />
        ) : (
          <h3>You have not logged in. Please go to Home to sign in.</h3>
        )}
        {isLoggedIn ? (
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.flowComponents}
          </DragDropContext>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default PageFlows;
