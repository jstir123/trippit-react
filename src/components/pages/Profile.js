import React, {useState} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

import ProfileHeader from '../users/ProfileHeader';
import SearchBar from '../trips/SearchBar';
import TripList from '../trips/TripList';
import MapContainer from '../common/MapContainer';
import {getTripName} from '../../utils/utils';

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
    paddingBottom: theme.spacing(2),
  },
  '@media (max-width: 900px)': {
    root: {
      width: '100%'
    }
  },
  '@media (min-width: 901px)': {
    root: {
      maxWidth: 750,
    }
  }
}));

const Profile = ({auth, trips, user, match, style}) => {
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
          trip.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
          getTripName(trip).toLowerCase().includes(searchInput.toLowerCase())
      )
    });
  }
  
  return (
    <div className='page'>
      
      <MapContainer trips={filteredTrips} />

      <Paper className={classes.root} elevation={0}>
        <ProfileHeader
          auth={auth}
          user={user && user[0]}
          tripCount={tripCount}
          isLoaded={isLoaded(user)}
          uid={match.params.uid} 
        />

        <SearchBar setSearchInput={setSearchInput} />

        {isLoaded(trips) && ((trips[0] && trips[0].uid) === match.params.uid)
          ? <TripList trips={filteredTrips} />
          : isLoaded(trips) && isEmpty(trips)
            ? <TripList trips={filteredTrips} />
            : <CircularProgress color='primary' style={{marginTop: '75px'}} />}
      </Paper>
      
    </div>
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
