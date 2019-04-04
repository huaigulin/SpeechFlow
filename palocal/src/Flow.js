import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;

const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.5s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.cards === this.props.cards) {
      return false;
    }
    return true;
  }

  render() {
    return this.props.cards.map((card, index) => (
      <Card key={card.id} card={card} index={index} />
    ));
  }
}

class Flow extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.flow.id} index={this.props.index}>
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{this.props.flow.title}</Title>
            <Droppable droppableId={this.props.flow.id} type="card">
              {(provided, snapshot) => (
                <CardList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList cards={this.props.cards} />
                  {provided.placeholder}
                </CardList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Flow;
