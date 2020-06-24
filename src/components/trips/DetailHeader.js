import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';
import {getTripName} from '../../utils/utils';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    tripName: {
        fontWeight: theme.typography.fontWeightBold,
    },
    dateText: {
        fontWeight: theme.typography.fontWeightLight,
        marginBottom: theme.spacing(2),
    },
    descText: {
        fontWeight: theme.typography.fontWeightLight,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(3),
    },
}));

const DetailHeader = ({trip, isLoaded}) => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
            <span>
                {isLoaded
                 ? <Typography variant='h3' className={classes.tripName}>{getTripName(trip)}</Typography>
                 : <Skeleton variant='text' animation='wave' />}
            </span>
            <span>
                {isLoaded
                 ? (
                    <Typography variant='subtitle1' className={classes.dateText}>
                        {trip.startDate
                         ? moment(trip.startDate.toDate()).format('MMM DD, YYYY')
                         : null}
                        {trip.startDate && trip.endDate
                         ? ' - '
                         : null}
                        {trip.endDate
                         ? moment(trip.endDate.toDate()).format('MMM DD, YYYY')
                         : null}
                    </Typography>
                 )
                 : <Skeleton variant='text' animation='wave' />}
            </span>
            <span>
                {isLoaded
                 ? (
                        <Typography variant='body1' className={classes.descText}>
                            {trip.description
                            ? trip.description
                            : null}
                        </Typography>
                 )
                 : <Skeleton variant='text' animation='wave' />}
            </span>
            {trip && trip.pictures && trip.pictures.length > 0
             ? null
             : <Divider />}
        </div>
    )
};

export default DetailHeader;