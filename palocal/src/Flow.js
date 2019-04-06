import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import InputBase from '@material-ui/core/InputBase';
import Card from './Card';
import './Flow.css';

const MainContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 200px;

  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h3`
  padding: 8px;
`;

const SubTitle = styled.h5`
  padding: 8px;
`;

const MainCardList = styled.div`
  padding: 8px;
  transition: background-color 0.5s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

const SubCardList = styled.div`
  padding: 8px;
  transition: background-color 0.5s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends PureComponent {
  render() {
    return this.props.cards.map((card, index) => (
      <Card key={card.id} card={card} index={index} />
    ));
  }
}

class Flow extends Component {
  handleTitleChange = event => {
    console.log(event.target.value);
  };

  render() {
    return (
      <Draggable draggableId={this.props.flow.id} index={this.props.index}>
        {provided => (
          <MainContainer {...provided.draggableProps} ref={provided.innerRef}>
            <MainTitle {...provided.dragHandleProps}>
              <InputBase
                className="mainTitle"
                defaultValue="New Flow"
                onChange={this.handleTitleChange}
              />
            </MainTitle>
            <Droppable droppableId={this.props.flow.id} type="main">
              {(provided, snapshot) => (
                <MainCardList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList cards={this.props.pdfCards} />
                  {provided.placeholder}
                </MainCardList>
              )}
            </Droppable>
            <SubContainer ref={provided.innerRef}>
              <SubTitle>Videos</SubTitle>
              <Droppable droppableId={this.props.flow.id + '-1'} type="sub-1">
                {(provided, snapshot) => (
                  <SubCardList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <InnerList cards={this.props.videoCards} />
                    {provided.placeholder}
                  </SubCardList>
                )}
              </Droppable>
            </SubContainer>
            <SubContainer ref={provided.innerRef}>
              <SubTitle>Images</SubTitle>
              <Droppable droppableId={this.props.flow.id + '-2'} type="sub-2">
                {(provided, snapshot) => (
                  <SubCardList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    <InnerList cards={this.props.imageCards} />
                    {provided.placeholder}
                  </SubCardList>
                )}
              </Droppable>
            </SubContainer>
          </MainContainer>
        )}
      </Draggable>
    );
  }
}

export default Flow;
