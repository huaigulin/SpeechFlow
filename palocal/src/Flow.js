import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Card from './Card';
import './Flow.css';

const MainContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 300px;

  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 280px;

  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h3`
  padding: 8px;
`;

const SubTitle = styled.h6`
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
  state = { anchorEL: null };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleTitleChange = event => {
    console.log(event.target.value);
  };

  startPresentation = event => {
    console.log(event);
  };

  addToFlow = event => {
    console.log(event);
  };

  deleteFlow = event => {
    console.log(event);
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Draggable draggableId={this.props.flow.id} index={this.props.index}>
        {provided => (
          <MainContainer {...provided.draggableProps} ref={provided.innerRef}>
            <MainTitle {...provided.dragHandleProps}>
              <InputBase
                className="mainTitle"
                defaultValue="New Flow"
                multiline={true}
                onChange={this.handleTitleChange}
              />
              <Fab
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuClick}
                color="inherit"
                aria-label="Add"
                className="menuIcon"
                size="small"
              >
                <MenuIcon />
              </Fab>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.startPresentation}>Present</MenuItem>
                <MenuItem onClick={this.addToFlow}>Add more files</MenuItem>
                <MenuItem onClick={this.deleteFlow}>Delete this flow</MenuItem>
              </Menu>
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
