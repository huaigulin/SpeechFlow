import React, { Component, PureComponent } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Card from './Card';
import './Flow.css';

const MainContainer = styled.div`
  height: 85vh;
  display: inline-block;
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 300px;

  // display: flex;
  // flex-direction: column;
  overflow-y: auto;
`;

const SubContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
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
      <Card
        key={card.id}
        card={card}
        index={index}
        isVideo={this.props.isVideo}
        deleteMyself={this.props.deleteCard}
        flowIndex={this.props.flowIndex}
        flowId={this.props.flowId}
      />
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
    const formData = new FormData();
    formData.append('userName', this.props.userName);
    formData.append('flowId', this.props.index);
    formData.append('flowTitle', event.target.value);

    const newTitle = event.target.value;

    axios
      .post(`/changeFlowTitle`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.props.changeMyTitle(this.props.flow.id, newTitle);
      })
      .catch(error => {
        console.log('ERROR in react changeFlowTitle post request: ' + error);
      });
  };

  startPresentation = event => {
    event.preventDefault();

    const { pdfCards, videoCards, imageCards } = this.props;

    if (pdfCards.length > 0) {
      const docName = pdfCards[0].content.substring(
        0,
        pdfCards[0].content.length - 4
      );
      var pdfsList = [];
      for (var i = 0; i < pdfCards.length; i++) {
        pdfsList.push(pdfCards[i].content);
      }

      this.props.setDocName(docName);
      this.props.setPageNum(1);
      this.props.setPdfsList(pdfsList);

      sessionStorage.setItem('docName', docName);
      sessionStorage.setItem('pageNum', 1);
      sessionStorage.setItem('pdfsList', JSON.stringify(pdfsList)); // sessionStorage only supports string
    }

    if (videoCards.length > 0) {
      const videoID = videoCards[0].content;
      var videosList = [];
      for (var j = 0; j < videoCards.length; j++) {
        videosList.push(videoCards[j].content);
      }

      this.props.setVideoLink(videoID);
      this.props.setVideosList(videosList);

      sessionStorage.setItem('videoID', videoID);
      sessionStorage.setItem('videosList', JSON.stringify(videosList));
    }

    if (imageCards.length > 0) {
      const currentImage = imageCards[0].content;
      var imagesList = [];
      for (var k = 0; k < imageCards.length; k++) {
        imagesList.push(imageCards[k].content);
      }

      this.props.setCurrentImage(currentImage);
      this.props.setImagesList(imagesList);

      sessionStorage.setItem('currentImage', currentImage);
      sessionStorage.setItem('imagesList', JSON.stringify(imagesList));
    }

    this.props.history.push('/PagePresentation');
  };

  addToFlow = event => {
    console.log(event);
  };

  deleteFlow = event => {
    const formData = new FormData();
    formData.append('userName', this.props.userName);
    formData.append('flowId', this.props.index);

    axios
      .post(`/deleteFlow`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // window.location.reload();
        this.props.deleteMyself(this.props.flow.id);
      })
      .catch(error => {
        console.log('ERROR in react deleteFlow post request: ' + error);
      });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { pdfCards, videoCards, imageCards } = this.props;
    const emptyFlow =
      pdfCards.length === 0 &&
      videoCards.length === 0 &&
      imageCards.length === 0;

    return (
      <Draggable draggableId={this.props.flow.id} index={this.props.index}>
        {provided => (
          <MainContainer {...provided.draggableProps} ref={provided.innerRef}>
            <MainTitle {...provided.dragHandleProps}>
              <InputBase
                className="mainTitle"
                defaultValue={this.props.flow.title}
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
                {emptyFlow ? (
                  <MenuItem onClick={this.startPresentation} disabled>
                    Present
                  </MenuItem>
                ) : (
                  <MenuItem onClick={this.startPresentation}>Present</MenuItem>
                )}
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
                  <InnerList
                    cards={this.props.pdfCards}
                    isVideo={false}
                    deleteCard={this.props.deleteCard}
                    flowIndex={this.props.index}
                    flowId={this.props.flow.id}
                  />
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
                    <InnerList
                      cards={this.props.videoCards}
                      isVideo={true}
                      deleteCard={this.props.deleteCard}
                      flowIndex={this.props.index}
                      flowId={this.props.flow.id + '-1'}
                    />
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
                    <InnerList
                      cards={this.props.imageCards}
                      isVideo={false}
                      deleteCard={this.props.deleteCard}
                      flowIndex={this.props.index}
                      flowId={this.props.flow.id + '-2'}
                    />
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
