import React, { Component, PureComponent } from 'react';
import initialData from './initial-data';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Flow from './Flow';

const Container = styled.div`
  display: flex;
`;

class InnerList extends PureComponent {
  render() {
    const { flows, mainFlowId, cardMap, index } = this.props;
    const mainFlow = flows[mainFlowId];
    const pdfCards = mainFlow.cardIds.map(cardId => cardMap[cardId]);

    const videoFlowId = mainFlowId + '-1';
    const videoFlow = flows[videoFlowId];
    const videoCards = videoFlow.cardIds.map(cardId => cardMap[cardId]);

    const imageFlowId = mainFlowId + '-2';
    const imageFlow = flows[imageFlowId];
    const imageCards = imageFlow.cardIds.map(cardId => cardMap[cardId]);
    return (
      <Flow
        flow={mainFlow}
        pdfCards={pdfCards}
        videoCards={videoCards}
        imageCards={imageCards}
        index={index}
      />
    );
  }
}

class PageFlows extends Component {
  state = initialData;

  // onDragStart = () => {
  //   document.body.style.color = 'orange';
  //   document.body.style.transition = 'background-color 0.5s ease';
  // };

  // onDragUpdate = update => {
  //   const { destination } = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(this.state.cards).length
  //     : 0;
  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  // };

  onDragEnd = result => {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'flow') {
      const newFlowOrder = Array.from(this.state.flowOrder);
      newFlowOrder.splice(source.index, 1);
      newFlowOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        flowOrder: newFlowOrder
      };
      this.setState(newState);
      return;
    }

    const start = this.state.flows[source.droppableId];
    const finish = this.state.flows[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newFlow = {
        ...start,
        cardIds: newCardIds
      };

      const newState = {
        ...this.state,
        flows: {
          ...this.state.flows,
          [newFlow.id]: newFlow
        }
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds
    };

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds
    };

    const newState = {
      ...this.state,
      flows: {
        ...this.state.flows,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-flows" direction="horizontal" type="flow">
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.flowOrder.map((flowId, index) => {
                return (
                  <InnerList
                    key={flowId}
                    flows={this.state.flows}
                    mainFlowId={flowId}
                    cardMap={this.state.cards}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default PageFlows;
