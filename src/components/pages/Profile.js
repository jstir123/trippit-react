import React from 'react';
import MapContainer from '../common/MapContainer';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100%',
    flexGrow: 1,
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={0} className={classes.root}>

      <Grid item xs={12} md={5}>
        <h1>Hello</h1>
      </Grid>

      <Grid item xs={12} md={7}>
        <MapContainer/>
      </Grid>

    </Grid>
  )
}

export default Profile;
