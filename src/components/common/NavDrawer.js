import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {signOut} from '../../store/actions/authActions';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import PeopleIcon from '@material-ui/icons/People';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    backgroundColor: theme.palette.background.paper,
  },
  drawer: {
    width: '100%',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  primaryBackground: {
    backgroundColor: theme.palette.primary.main,
  },
  secondaryBackground: {
    backgroundColor: theme.palette.secondary.main,
  }
}));

const NavDrawer = ({open, handleClose, auth, signOut, profile}) => {
  const classes = useStyles();

  return (
    <Drawer anchor='left' open={open} onClose={handleClose} className={classes.drawer}>
      <div className={classes.root} onClick={handleClose} role='presentation'>
        <List component='nav'>
          {auth.uid ? (
            <>
              <Link to={`/profile/${auth.uid}`} className={classes.link}>
                <ListItem button component='nav'>
                  <ListItemAvatar>
                    <Avatar
                      alt=''
                      src={profile.profilePicURL}/>
                  </ListItemAvatar>
                  <ListItemText primary='My Trips' />
                </ListItem>
                <Divider />
              </Link>
              <Link to={`/users`} className={classes.link}>
                <ListItem button component='nav'>
                  <ListItemAvatar>
                    <Avatar className={classes.secondaryBackground}>
                      <PeopleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Users' />
                </ListItem>
                <Divider />
              </Link>
              <ListItem button component='nav' onClick={signOut}>
                <ListItemAvatar>
                  <Avatar className={classes.primaryBackground}>
                    <LockIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Logout' />
              </ListItem>
              <Divider />
            </>
          ) : (
            <>
              <Link to='/login' className={classes.link}>
                <ListItem button component='nav'>
                  <ListItemAvatar>
                    <Avatar className={classes.primaryBackground}>
                      <LockOpenIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Login' />
                </ListItem>
                <Divider />
              </Link>
              <Link to='/signup' className={classes.link}>
                <ListItem button component='nav'>
                  <ListItemAvatar>
                    <Avatar className={classes.secondaryBackground}>
                      <PersonAddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary='Sign Up' />
                </ListItem>
                <Divider />
              </Link>
            </>
          )}
        </List>
      </div>
    </Drawer>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default connect(null, mapDispatchToProps)(NavDrawer);
