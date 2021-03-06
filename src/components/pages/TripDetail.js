import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';

import Spinner from '../common/Spinner';
import DetailHeader from '../trips/DetailHeader';
import DetailPicList from '../trips/DetailPicList';
import Itinerary from '../trips/Itinerary';

import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

const TripDetail = ({auth, trip, itinerary, match}) => {
    const classes = useStyles();
    const tripId = trip && trip.id;
    const tripMatch = match.params.id === tripId;

    if (auth.isEmpty) return <Redirect to='/login' />

    return (
        <div className='page'>
            {isLoaded(trip) && tripMatch
                ? (
                    <div className={classes.root}>
                        <DetailHeader trip={trip} tripId={tripId} />
                        <DetailPicList trip={trip} tripId={tripId} />
                        <Itinerary itinerary={itinerary} uid={trip && trip.uid} tripId={tripId} />
                    </div>
                )
                : isLoaded(trip) && isEmpty(trip)
                    ? (
                        <Typography variant='body2' style={{margin: '25px', fontWeight: 'lighter'}}>
                            We can't find this trip.
                        </Typography>
                    )
                    : <Spinner />}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        trip: state.firestore.ordered.trip && state.firestore.ordered.trip[0],
        itinerary: state.firestore.ordered.itinerary
    }
};

export default compose(
    firestoreConnect((props) => [
        {collection: 'trips', doc: props.match.params.id, storeAs: 'trip'},
        {collection: 'itinerary', where: [['tripId','==',props.match.params.id]]}
    ]),
    connect(mapStateToProps)
)(TripDetail);