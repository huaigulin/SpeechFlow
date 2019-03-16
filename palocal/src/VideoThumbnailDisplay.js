import React, { Component } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import VideoThumbnail from './VideoThumbnail';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
});

class VideoThumbnailDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IDs: [],
      thumbnails: [],
      videoCheckedStates: []
    };
    this.getThumbnails = this.getThumbnails.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setVideoCheckedStates = this.setVideoCheckedStates.bind(this);
    this.getThumbnails(this.props.userName);
  }

  setVideoCheckedStates(videoCheckedStates) {
    this.setState({
      videoCheckedStates: videoCheckedStates
    });
  }

  getThumbnails(userName) {
    const formData = new FormData();
    formData.append('userName', userName);
    axios
      .post(`/getThumbnails`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        var IDs = response.data;
        this.setState({ IDs: IDs });
        var urls = [];
        for (var i = 0; i < IDs.length; i++) {
          urls.push('http://i1.ytimg.com/vi/' + IDs[i] + '/default.jpg');
        }
        var thumbnails = [];
        var checkedStates = [];
        for (var i = 0; i < urls.length; i++) {
          thumbnails.push(
            <VideoThumbnail
              src={urls[i]}
              videoCheckedStates={this.state.videoCheckedStates}
              setVideoCheckedStates={this.setVideoCheckedStates}
              key={i}
              index={i}
            />
          );
          checkedStates.push(false);
        }
        this.setState({ thumbnails: thumbnails });
        this.setState({ videoCheckedStates: checkedStates });
      })
      .catch(error => {
        console.log('ERROR in getThumbnails post request: ' + error);
      });
  }

  handleDelete = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('userName', this.props.userName);

    for (var i = 0; i < this.state.videoCheckedStates.length; i++) {
      if (this.state.videoCheckedStates[i] === true) {
        formData.append('IDs', this.state.IDs[i]);
      }
    }

    axios
      .post(`/deleteThumbnails`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log('ERROR in react deleteThumbnails post request: ' + error);
      });
  };

  render() {
    const { classes } = this.props;
    var numSelected = 0;
    for (var i = 0; i < this.state.videoCheckedStates.length; i++) {
      if (this.state.videoCheckedStates[i] === true) {
        numSelected++;
      }
    }

    return (
      <div>
        <br />
        {numSelected > 0 ? (
          <Toolbar
            className={classNames(classes.root, {
              [classes.highlight]: numSelected > 0
            })}
          >
            <Typography
              color="inherit"
              variant="subtitle1"
              className={classes.title}
            >
              {numSelected} selected
            </Typography>
            <div className={classes.spacer} />
            <div className={classes.actions} />
            <Tooltip title="Delete" className="deleteIcon">
              <IconButton aria-label="Delete" onClick={this.handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        ) : (
          <Toolbar
            className={classNames(classes.root, {
              [classes.highlight]: numSelected > 0
            })}
          >
            <Typography variant="h6" id="tableTitle" className={classes.title}>
              Your Videos:
            </Typography>
          </Toolbar>
        )}
        <div>{this.state.thumbnails}</div>
      </div>
    );
  }
}

export default withStyles(toolbarStyles)(VideoThumbnailDisplay);
