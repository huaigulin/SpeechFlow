import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

const styles = {
  appBar: {
    backgroundColor: grey[50]
  },
  brand: {
    width: 30,
    marginBottom: -10,
    marginRight: 10
  },
  brandText: {
    width: 150,
    marginBottom: -10
  },
  fab: {
    backgroundColor: grey[200],
    marginRight: 25
    // marginTop: 10
  },
  avatar: {
    // margin: 10,
    width: 30,
    height: 30
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  beegButton: {
    textTransform: 'initial',
    fontSize: 20,
    marginLeft: 20,
    // marginRight: 20,
    backgroundColor: grey[50],
    color: blue[500]
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

  goToPresentation = event => {
    event.preventDefault();
    this.props.history.push('/PagePresentation');
  };

  goToMaterials = event => {
    event.preventDefault();
    this.props.history.push('/PageMaterials');
  };

  goToFlows = event => {
    event.preventDefault();
    this.props.history.push('/PageFlows');
  };

  render() {
    const isLoggedIn = this.props.userName != null;
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            {isLoggedIn ? (
              <Grid container justify="space-between" alignItems="center">
                <div>
                  {/* <Button
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </Button> */}
                  <img
                    className={classes.brand}
                    src={require('./SpeechFlow_favicon.png')}
                    alt="logo"
                  />
                  <img
                    className={classes.brandText}
                    src={require('./SpeechFlow_text.png')}
                    alt="Speech Flow"
                  />
                  <Button
                    className={classes.beegButton}
                    onClick={this.goToMaterials}
                    color="primary"
                  >
                    Materials
                  </Button>
                  <Button
                    className={classes.beegButton}
                    onClick={this.goToPresentation}
                    color="primary"
                  >
                    Presentation
                  </Button>
                  <Button
                    className={classes.beegButton}
                    onClick={this.goToFlows}
                    color="primary"
                  >
                    Flows
                  </Button>
                </div>
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
              <div>
                <img
                  className={classes.brand}
                  src={require('./SpeechFlow_favicon.png')}
                  alt="logo"
                />
                <img
                  className={classes.brandText}
                  src={require('./SpeechFlow_text.png')}
                  alt="Speech Flow"
                />
                <Button className={classes.beegButton} color="primary" href="/">
                  Home
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
