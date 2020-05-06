import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: '40%',
  },
  profPic: {
    height: 100,
    width: 100,
  },
  profPicGrid: {
    textAlign: 'center',
    marginLeft: theme.spacing(1),
  },
  nameGrid: {
    textAlign: 'center',
    paddingLeft: theme.spacing(1),
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
  navButton: {
    borderColor: theme.palette.primary.main,
    borderRadius: '25px',
    marginLeft: '15px',
  },
  '@media (max-width: 900px)': {
    root: {
      width: '100%'
    }
  }
}));

const ProfileHeader = ({user, tripCount}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container
            direction='row'
            alignItems='center'
            className={classes.head}>
        <Grid item xs={3} className={classes.profPicGrid}>
          <Avatar src={user.profilePicURL} className={classes.profPic} />
        </Grid>
        <Grid item xs={6} className={classes.nameGrid}>
          <Typography variant='h5'>
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant='body2'>
            {`Trips Logged: ${tripCount}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item xs={12} className={classes.bioGrid}>
          <Typography variant='body2'>
            {user.bio ? user.bio : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify='center'>
        <Grid item className={classes.btnGrid}>
          <Button variant="outlined" color='primary' className={classes.navButton} startIcon={<AddIcon/>}>
            Add Trip
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Paper>
  )
};

export default ProfileHeader;
