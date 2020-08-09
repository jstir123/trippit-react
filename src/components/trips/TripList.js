import React from 'react';

import TripCard from './TripCard';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const TripList = ({trips}) => {
    if (trips.length > 0) {
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
    } else {
        return (
            <Typography variant='body2' style={{marginTop: '25px', fontWeight: 'lighter'}}>
                We couldn't find any trips!
            </Typography>
        )
    } 
};

export default TripList;