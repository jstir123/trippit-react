import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import MapContainer from '../common/MapContainer';

const Profile = ({auth}) => {

  if (auth.isEmpty) return <Redirect to='/login' />

  return (
    <>
      <h1>Hello</h1>
      <MapContainer/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps)(Profile);
