import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        marginTop: 75,
    },
}));

const Spinner = () => {
    const classes = useStyles();

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.root}>
            <CircularProgress />
        </Grid>
    )
};

export default Spinner;