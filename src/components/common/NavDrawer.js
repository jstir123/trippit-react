import React from 'react';
import {Link} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
    color: '#000000',
    textDecoration: 'none',
  }
}));

const NavDrawer = ({open, handleClose, auth}) => {
  const classes = useStyles();

  return (
    <Drawer anchor='left' open={open} onClose={handleClose} className={classes.drawer}>
      <div className={classes.root} onClick={handleClose} role='presentation'>
        <List component='nav'>
          {auth.uid ? (
            <Link to='/profile' className={classes.link}>
              <ListItem button component="nav">
                <ListItemAvatar>
                  <Avatar alt='' src='https://firebasestorage.googleapis.com/v0/b/trippit.appspot.com/o/GXIMtCmsgmQShCRVekMKFAWDzZk1%2Fprofile-picture%2FBackup31.jpg?alt=media&token=5993019f-9b80-4757-8d90-b83c3c0f697a'/>
                </ListItemAvatar>
                <ListItemText primary='My Trips' />
              </ListItem>
              <Divider />
            </Link>
          ) : (
            <>
            <Link to='/login' className={classes.link}>
              <ListItem button component="nav">
                <ListItemAvatar>
                  <Avatar>
                    <LockOpenIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='Login' />
              </ListItem>
              <Divider />
            </Link>
            <Link to='/signup' className={classes.link}>
              <ListItem button component="nav">
                <ListItemAvatar>
                  <Avatar>
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

export default NavDrawer;
