import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import MapContainer from '../common/MapContainer';
import ProfileHeader from '../users/ProfileHeader';
import SearchBar from '../trips/SearchBar';
import TripList from '../trips/TripList';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
  },
  '@media (max-width: 900px)': {
      root: {
        width: '100%'
      }
    }
}));

const Profile = ({auth, trips, user}) => {
  const classes = useStyles();

  if (auth.isEmpty) return <Redirect to='/login' />

  const tripCount = trips && trips.length;

  return (
    <>
      <MapContainer trips={trips} />

      <Paper className={classes.root} elevation={0}>

        {isLoaded(user)
        ? <ProfileHeader user={user[0]} tripCount={tripCount} />
        : <p>Loading...</p>}

        <SearchBar />

        {isLoaded(trips)
        ? <TripList trips={trips} />
        : <p>Loading...</p>}

      </Paper>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    trips: state.firestore.ordered.trips,
    user: state.firestore.ordered.users
  }
};

export default compose(
  firestoreConnect((props) => [
    {collection: 'trips', where: [['uid','==', props.match.params.uid]], orderBy: ['startDate', 'desc']},
    {collection: 'users', where: [['uid', '==', props.match.params.uid]]}
  ]),
  connect(mapStateToProps)
)(Profile);
