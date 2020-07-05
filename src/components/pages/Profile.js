import React, {useState} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

import ProfileHeader from '../users/ProfileHeader';
import SearchBar from '../trips/SearchBar';
import TripList from '../trips/TripList';
import MapContainer from '../common/MapContainer';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const [searchInput, setSearchInput] = useState('');

  if (auth.isEmpty) return <Redirect to='/login' />
  
  let tripCount = trips && trips.length;
  let filteredTrips;

  if (isLoaded(trips)) {
    filteredTrips = trips.filter(trip => {
      return (
          trip.city.toLowerCase().includes(searchInput.toLowerCase()) ||
          trip.state.toLowerCase().includes(searchInput.toLowerCase()) ||
          trip.country.toLowerCase().includes(searchInput.toLowerCase()) ||
          trip.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          trip.lastName.toLowerCase().includes(searchInput.toLowerCase())
      )
    });
  }
  
  return (
    <>
      <MapContainer trips={filteredTrips} />

      <Paper className={classes.root} elevation={0}>

        <ProfileHeader user={user && user[0]} tripCount={tripCount} isLoaded={isLoaded(user)} />

        <SearchBar setSearchInput={setSearchInput} />

        {isLoaded(trips)
        ? <TripList trips={filteredTrips} />
        : <CircularProgress color='primary' style={{marginTop: '75px'}} />}

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
