import React from 'react';
import {useSelector} from 'react-redux';
import {isLoaded} from 'react-redux-firebase';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

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
    color: '#000000',
    background: '#ffffff',
    boxShadow: 'none',
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
        <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
          <CircularProgress />
        </Grid>
      </>
    )
  }
  return children
}

export default AuthIsLoaded;
