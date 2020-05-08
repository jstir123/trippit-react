import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(1),
    width: '100%',
    maxWidth: 450,
  },
  profPic: {
    height: 100,
    width: 100,
    margin: 'auto',
  },
  profPicGrid: {
    textAlign: 'center',
  },
  nameGrid: {
    textAlign: 'center',
  },
  bioGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  btnGrid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  addButton: {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderRadius: '25px',
    marginLeft: '15px',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  lightText: {
    fontWeight: 'lighter',
  },
}));

const ProfileHeader = ({user, tripCount, isLoaded}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container
            direction='row'
            alignItems='center'
            spacing={1}
            className={classes.head}>
        <Grid item xs={4} className={classes.profPicGrid}>
          {isLoaded
          ? <Avatar src={user && user.profilePicURL} className={classes.profPic} />
          : <Skeleton variant="circle" animation="wave" width={100} height={100} />}
        </Grid>
        <Grid item xs={4} className={classes.nameGrid}>
          {isLoaded
          ? (
            <>
              <Typography variant='h5'>
                {`${user && user.firstName} ${user && user.lastName}`}
              </Typography>
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
          <Button variant='outlined' size='small' className={classes.addButton} startIcon={<AddIcon/>}>
            Add Trip
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default ProfileHeader;
