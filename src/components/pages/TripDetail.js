import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import DetailHeader from '../trips/DetailHeader';
import DetailPicList from '../trips/DetailPicList';
import Itinerary from '../trips/Itinerary';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
}));

const TripDetail = ({auth, trip, itinerary, match}) => {
    const classes = useStyles();
    const tripId = match.params.id

    if (auth.isEmpty) return <Redirect to='/login' />

    return (
        <div className={classes.root}>
            <DetailHeader trip={trip} tripId={tripId} isLoaded={isLoaded(trip)} />
            <DetailPicList pics={trip && trip.pictures} isLoaded={isLoaded(trip)} />

            <Itinerary itinerary={itinerary} tripId={tripId} />
            
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        trip: state.firestore.data['trip'],
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