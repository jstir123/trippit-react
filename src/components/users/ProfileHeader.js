import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from '@material-ui/core/styles';
import AddTrip from '../trips/AddTrip';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(1),
    width: '100%',
    maxWidth: 500,
  },
  profPic: {
    height: 120,
    width: 120,
    margin: 'auto',
    transition: '0.3s',
    '&:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 1px 10px 0 rgba(0,0,0,.30)',
    },
  },
  profPicGrid: {
    textAlign: 'center',
  },
  nameGrid: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  bioGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  btnGrid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  addButton: {
    color: '#fff',
    borderRadius: '25px',
    boxShadow: '0 1px 10px 0 rgba(0,0,0,.12)',
    width: 120,
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  lightText: {
    fontWeight: 'lighter',
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  '@media (max-width: 900px)': {
    profPic: {
      height: 100,
      width: 100,
    }
  }
}));

const ProfileHeader = ({user, tripCount, isLoaded}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const popOpen = Boolean(anchorEl);

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container
            direction='row'
            alignItems='center'
            spacing={1}
            className={classes.head}>
        <Grid item xs={12} className={classes.profPicGrid}>
          {isLoaded
          ? <Avatar
              src={user && user.profilePicURL}
              onClick={() => console.log('click')}
              className={classes.profPic}
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup='true'
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            />
          : <Skeleton variant='circle' animation='wave' className={classes.profPic} />}
          <Popover
            id='mouse-over-popover'
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={popOpen}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>Update Profile Picture</Typography>
          </Popover>
        </Grid>
        <Grid item xs={12} className={classes.nameGrid}>
          {isLoaded
          ? (
            <>
              <Grid container alignItems='center'  className={classes.profPicGrid}>
                <Grid item xs={4}>
                  {null}
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5'>
                    {`${user && user.firstName} ${user && user.lastName}`}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Typography variant='body2' className={classes.lightText}>
                {`Trips Logged: ${tripCount}`}
              </Typography>
              
            </>
          )
          : (
            <>
              <Skeleton variant="text" animation="wave" />
              <Skeleton variant="text" animation="wave" />
            </>
          )}
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item xs={12} className={classes.bioGrid}>
          {isLoaded
          ? (
            <Typography variant='body2' className={classes.lightText}>
              {user && user.bio}
            </Typography>
          )
          : <Skeleton variant="rect" animation="wave" height={40} />}
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item className={classes.btnGrid}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            className={classes.addButton}
            startIcon={<AddCircleIcon/>}
            onClick={() => setOpen(true)}
          >
            Add Trip
          </Button>
          <AddTrip open={open} handleClose={() => setOpen(false)}
          />
        </Grid>
      </Grid>
    </Paper>
  )
};

export default ProfileHeader;
