import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import grey from '@material-ui/core/colors/grey';

const styles = {
  fab: {
    backgroundColor: grey[200]
  },
  avatar: {
    // margin: 10,
    width: 30,
    height: 30
  }
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
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
