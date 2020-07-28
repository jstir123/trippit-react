import React, {useState} from 'react';
import ImgsViewer from 'react-images-viewer';

import AddTrip from '../trips/AddTrip';
import EditProfile from './EditProfile';
import EditProfPic from './EditProfPic';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from '@material-ui/core/styles';


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
    border: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: '0 1px 10px 0 rgba(0,0,0,.12)',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 1px 10px 0 rgba(0,0,0,.30)',
    },
  },
  profPicGrid: {
    textAlign: 'center',
  },
  nameGrid: {
    textAlign: 'center',
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  editBtn: {
    height: 25,
    '& .MuiSpeedDial-fab': {
      boxShadow: theme.shadows[0],
      background: theme.palette.background.paper,
      color: theme.palette.grey[400],
    },
    '& 	.MuiSpeedDialAction-fab': {
      boxShadow: '0 1px 10px 0 rgba(0,0,0,.12)',
    },
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
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(.5),
    borderRadius: 25,
    boxShadow: '0 1px 10px 0 rgba(0,0,0,.12)',
    width: 120,
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  lightText: {
    fontWeight: theme.typography.fontWeightLight,
  },
  '@media (max-width: 900px)': {
    profPic: {
      height: 100,
      width: 100,
    }
  }
}));

const ProfileHeader = ({auth, user, tripCount, isLoaded, uid}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [editProfPicOpen, setEditProfPicOpen] = useState(false);
  const [imgViewerOpen, setImgViewerOpen] = useState(false);
  const displayData = isLoaded && (uid === (user && user.id))

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container
            direction='row'
            alignItems='center'
            spacing={1}
            className={classes.head}>
        <Grid item xs={12} className={classes.profPicGrid}>
          {displayData
          ? (
            <>
              <Avatar
                  src={user && user.profilePicURL}
                  onClick={() => setImgViewerOpen(true)}
                  className={classes.profPic}
                />
                <ImgsViewer
                  imgs={[{src: user && user.profilePicURL}]}
                  isOpen={imgViewerOpen}
                  onClose={() => setImgViewerOpen(false)}
                  currImg={0}
                  imgCountSeparator=' of '
                  backdropCloseable={true}
              />
            </>
          )
          : <Skeleton variant='circle' animation='wave' className={classes.profPic} />}
        </Grid>
        <Grid item xs={12} className={classes.nameGrid}>
          {displayData
          ? (
            <>
              <Grid container alignItems='center' className={classes.nameGrid}>
                <Grid item xs={4}>
                  {null}
                </Grid>
                <Grid item xs={4}>
                  <Typography variant='h5'>
                    {`${user && user.firstName} ${user && user.lastName}`}
                  </Typography>
                </Grid>
                {auth.uid === uid
                  ? (
                    <Grid item xs={1}>
                      <SpeedDial
                        ariaLabel='Edit Profile'
                        className={classes.editBtn}
                        icon={<EditIcon />}
                        onClose={() => setSpeedDialOpen(false)}
                        onOpen={() => setSpeedDialOpen(true)}
                        open={speedDialOpen}
                        direction='up'
                      >
                        <SpeedDialAction
                          icon={<EditIcon />}
                          tooltipTitle='Edit Profile Info'
                          onClick={() => setEditOpen(true)}
                        />
                        <SpeedDialAction
                          icon={<EditIcon />}
                          tooltipTitle='Edit Profile Picture'
                          onClick={() => setEditProfPicOpen(true)}
                        />
                      </SpeedDial>
                      <EditProfile
                        user={user}
                        open={editOpen}
                        handleClose={() => setEditOpen(false)}
                      />
                      <EditProfPic
                        uid={user && user.id}
                        open={editProfPicOpen}
                        handleClose={() => setEditProfPicOpen(false)}
                      />
                    </Grid>
                  ) : null}
              </Grid>
              <Typography variant='body2' className={classes.lightText}>
                {`Trips Logged: ${tripCount ? tripCount : 0}`}
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
          {displayData
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
          {auth.uid === uid
            ? (
              <>
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
                <AddTrip open={open} handleClose={() => setOpen(false)} />
              </>
            ) : null}
        </Grid>
      </Grid>
    </Paper>
  )
};

export default ProfileHeader;
