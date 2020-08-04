import React from 'react';
import {useSelector} from 'react-redux';
import {isLoaded} from 'react-redux-firebase';

import Spinner from './Spinner';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    marginTop: 75,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[0],
  },
}));

const AuthIsLoaded = ({children}) => {
  const classes = useStyles();
  const state = useSelector(state => state);
  console.log(state);
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) {
    return (
      <>
        <div className={classes.nav}>
          <AppBar position="sticky" className={classes.navbar}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" className={classes.title}>
                Trippit
              </Typography>
            </Toolbar>
          </AppBar>
          <Divider />
        </div>
        <Spinner />
      </>
    )
  }
  return children
}

export default AuthIsLoaded;
