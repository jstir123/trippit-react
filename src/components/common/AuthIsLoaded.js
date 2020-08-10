import React from 'react';
import {useSelector} from 'react-redux';
import {isLoaded} from 'react-redux-firebase';

import Spinner from './Spinner';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    marginTop: 75,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    // flexGrow: 1,
  },
  navbar: {
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[0],
  },
}));

const AuthIsLoaded = ({children}) => {
  const classes = useStyles();
  const auth = useSelector(state => state.firebase.auth);
  
  if (!isLoaded(auth)) {
    return (
      <>
        <div className={classes.nav}>
          <AppBar position='sticky' className={classes.navbar}>
            <Toolbar className={classes.toolbar}>
              <Typography variant='h4' className={classes.title}>
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
