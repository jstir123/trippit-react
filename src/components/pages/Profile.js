import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import MapContainer from '../common/MapContainer';
import ProfileHeader from '../users/ProfileHeader';

const Profile = ({auth, trips, user}) => {

  if (auth.isEmpty) return <Redirect to='/login' />

  const tripCount = trips && trips.length

  return (
    <>
      <MapContainer trips={trips} />

      {isLoaded(user)
      ? <ProfileHeader user={user[0]} tripCount={tripCount} />
      : null}

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
