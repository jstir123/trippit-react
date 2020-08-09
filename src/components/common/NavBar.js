import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import NavDrawer from './NavDrawer';
import {signOut} from '../../store/actions/authActions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    // flexGrow: 1,
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  navbar: {
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[0],
  },
  navButton: {
    borderRadius: 5,
    marginLeft: 15,
    width: 100,
    transition: theme.transitions.easing.easeInOut,
    transitionDuration: theme.transitions.duration.standard,
    boxShadow: theme.shadows[0],
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  navDrawer: {
    width: 360,
  },
}));

const NavBar = ({auth, profile, signOut}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position='fixed' className={classes.navbar}>
        <Toolbar className={classes.root}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            onClick={handleToggle}
            color='inherit'
            aria-label='menu'
            >
            <MenuIcon />
          </IconButton>
          <NavDrawer
            open={open}
            handleClose={handleClose}
            className={classes.navDrawer}
            auth={auth}
            profile={profile}
            />
          {auth.uid
            ? (
              <div className={classes.menuText}>
                <Link to={`/profile/${auth.uid}`} className={classes.link}>
                  <Button color='inherit' style={{ textTransform: 'none' }}>
                    <Typography variant='body1'>
                      My Trips
                    </Typography>
                  </Button>
                </Link>
                <Link to='/users' className={classes.link}>
                  <Button color='inherit' style={{ textTransform: 'none' }}>
                    <Typography variant='body1'>
                      Users
                    </Typography>
                  </Button>
                </Link>
              </div>
            ) : (
              <div className={classes.menuText}>
                <Link to='/login' className={classes.link}>
                  <Button color='inherit' style={{ textTransform: 'none' }}>
                    <Typography variant='body1'>
                      Login
                    </Typography>
                  </Button>
                </Link>
                <Link to='/signup' className={classes.link}>
                  <Button color='inherit' style={{ textTransform: 'none' }}>
                    <Typography variant='body1'>
                      Sign Up
                    </Typography>
                  </Button>
                </Link>
              </div>
            )}
          <Link to='/' className={classes.link}>
            <Typography variant='h4' className={classes.title}>
              Trippit
            </Typography>
          </Link>
          {auth.uid ? (
            <div className={classes.menuText}>
              <Typography variant='body1'>
                {profile && profile.firstName
                ? `Hi ${profile.firstName}!`
                : null}
              </Typography>
              <Button
                variant='outlined'
                color='primary'
                className={classes.navButton}
                onClick={signOut}
                >
                Logout
              </Button>
            </div>
          ) : (null)}
        </Toolbar>
        <Divider />
      </AppBar>
      <Toolbar />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
