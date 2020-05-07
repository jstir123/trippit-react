import React from 'react';
import Grid from '@material-ui/core/Grid';
import TripCard from './TripCard';

const TripList = ({trips}) => {
    return (
        <Grid container alignItems='center' spacing={1} >
            {trips.map(trip => {
                return (
                    <Grid item xs={12} xl={6} key={trip.id} >
                        <TripCard trip={trip} />
                    </Grid>
                )
            })}
        </Grid>
    )
};

export default TripList;