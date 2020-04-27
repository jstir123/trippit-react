import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
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
  logoutButton: {
    color: '#87ffff',
    borderColor: '#87ffff',
    borderRadius: '25px',
    marginLeft: '15px',
  },
}));

const NavBar = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Trippit
          </Typography>
          <Typography variant="body1">
            Hi, JT
          </Typography>
          <Button variant="outlined" className={classes.logoutButton}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  )
}

export default NavBar;
