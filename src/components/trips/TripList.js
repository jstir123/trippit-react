import React from 'react';

import TripCard from './TripCard';

import Grid from '@material-ui/core/Grid';


const TripList = ({trips}) => {
    return (
        <Grid container alignItems='center' spacing={1} >
            {trips.map(trip => {
                return (
                    <Grid item xs={12} xl={6} key={trip && trip.id} >
                        <TripCard trip={trip} />
                    </Grid>
                )
            })}
        </Grid>
    )
};

export default TripList;