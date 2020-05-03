import React, {useState} from 'react';
import {connect} from 'react-redux';
import NavDrawer from './NavDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import {signOut} from '../../store/actions/authActions';

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
  navButton: {
    borderColor: theme.palette.primary.main,
    borderRadius: '25px',
    marginLeft: '15px',
  },
  navButtonFilled: {
    color: '#000000',
    borderColor: theme.palette.primary.main,
    borderRadius: '25px',
    marginLeft: '15px',
    boxShadow: 'none',
    width: 90,
  },
  navDrawer: {
    width: 360,
  },
  link: {
    color: '#000000',
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
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleToggle} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <NavDrawer open={open} handleClose={handleClose} className={classes.navDrawer} auth={auth}/>
          <Typography variant="h5" className={classes.title}>
            Trippit
          </Typography>
          {auth.uid ? (
            <>
              <Typography variant="body1">
                {`Hi, ${profile.firstName}`}
              </Typography>
              <Button variant="outlined" color='primary' className={classes.navButton} onClick={signOut}>Logout</Button>
            </>
          ) : (null)}
        </Toolbar>
        <Divider />
      </AppBar>
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
