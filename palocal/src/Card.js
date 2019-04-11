import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const TextBox = styled.div`
  max-width: 180px;
  word-break: break-all;
  white-space: normal;
`;

class Card extends Component {
  handleDelete = event => {
    this.props.deleteMyself(
      this.props.card.id,
      this.props.flowIndex,
      this.props.index,
      this.props.flowId
    );
  };

  render() {
    const isVideo = this.props.isVideo;
    return (
      <Draggable draggableId={this.props.card.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <div>
                {isVideo ? (
                  <img
                    className="thumbnailImage"
                    src={
                      'https://i1.ytimg.com/vi/' +
                      this.props.card.content +
                      '/default.jpg'
                    }
                    alt="video thumbnail"
                  />
                ) : (
                  <TextBox>{this.props.card.content}</TextBox>
                )}
              </div>
              <IconButton aria-label="Delete" onClick={this.handleDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Card;
