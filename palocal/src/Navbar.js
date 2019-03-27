import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import grey from '@material-ui/core/colors/grey';


const styles = {
  fab: {
    backgroundColor: grey[200],
    marginRight: 25,
    marginTop: 10
  },
  avatar: {
    // margin: 10,
    width: 30,
    height: 30
  },
  root: {
   flexGrow: 1,
  },
  grow: {
   flexGrow: 1,
  },
  menuButton: {
   marginLeft: -12,
   marginRight: 20,
 },
 beegButton: {
   marginLeft: -12,
   marginRight: 20,
},
};

class Navbar extends Component {
  state = {
    anchorEl: null
  };

  handleAvatarClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignOut = () => {
    this.props.history.push('/');
  };

  render() {
    const isLoggedIn = this.props.userName != null;
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <IconButton className={classes.beegButton} href="PageMaterials" color="inherit">Upload Files</IconButton>
          <IconButton className={classes.beegButton} href="PagePresentation" color="inherit">Presentation</IconButton>

          {isLoggedIn ? (
            <Grid container justify="flex-end" alignItems="center">
              <Fab
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                size="small"
                onClick={this.handleAvatarClick}
                className={classes.fab}
              >
                <Avatar
                  alt="Profile image"
                  src={this.props.profileImageUrl}
                  className={classes.avatar}
                />
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
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleSignOut}>Sign out</MenuItem>
                {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
              </Menu>
            </Grid>
          ) : (
              <IconButton color="inherit" href="/">Login</IconButton>
          )}
        </Toolbar>
      </AppBar>

      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
