import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import DetailHeader from '../trips/DetailHeader';
import DetailPicList from '../trips/DetailPicList';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(2),
    },
}));

const TripDetail = ({auth, trip}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DetailHeader trip={trip} isLoaded={isLoaded(trip)} />
            <DetailPicList pics={trip && trip.pictures} isLoaded={isLoaded(trip)} />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        trip: state.firestore.data['trip']
    }
};

export default compose(
    firestoreConnect((props) => [
        {collection: 'trips', doc: props.match.params.id, storeAs: 'trip'}
    ]),
    connect(mapStateToProps)
)(TripDetail);