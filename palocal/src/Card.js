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
  width: 180px;
  word-wrap: break-word;
`;

class Card extends Component {
  handleDelete = event => {
    console.log(event);
  };
  render() {
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
              <TextBox>{this.props.card.content}</TextBox>
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
