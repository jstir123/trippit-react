import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';

import RemoveTrip from './RemoveTrip';
import EditTrip from './EditTrip';
import {getTripName} from '../../utils/utils';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    header: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    title: {
        display: 'flex',
        alignItems: 'center',
    },
    tripName: {
        fontWeight: theme.typography.fontWeightBold,
        marginRight: theme.spacing(1),
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

const DetailHeader = ({trip, tripId}) => {
    const classes = useStyles();
    const auth = useSelector(state => state.firebase.auth);
    const [editOpen, setEditOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);

    return (
        <div className={classes.header}>
            <div className={classes.title}>
                <Typography variant='h3' className={classes.tripName}>{getTripName(trip)}</Typography>
                {auth.uid === (trip && trip.uid)
                    ? (
                        <>
                            <Tooltip title='Edit Trip'>
                                <IconButton aira-label='edit' onClick={() => setEditOpen(true)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <EditTrip
                                trip={{id: tripId, ...trip}}
                                tripName={getTripName(trip)}
                                editOpen={editOpen}
                                handleClose={() => setEditOpen(false)}
                            />
                            <Tooltip title='Remove Trip'>
                                <IconButton aria-label='delete' onClick={() => setRemoveOpen(true)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <RemoveTrip
                                tripID={tripId}
                                tripName={getTripName(trip)}
                                removeOpen={removeOpen}
                                handleClose={() => setRemoveOpen(false)}
                            />
                        </> 
                    ) : null}
            </div>
            <span>
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
            </span>
            <span>
                <Typography variant='body1' className={classes.descText}>
                    {trip.description
                        ? trip.description
                        : null}
                </Typography>
            </span>
            <Divider />
        </div>
    )
};

export default DetailHeader;