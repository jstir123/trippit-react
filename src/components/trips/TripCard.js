import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import moment from 'moment';

import RemoveTrip from './RemoveTrip';
import EditTrip from './EditTrip';
import {getTripName} from '../../utils/utils';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        borderRadius: 5,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: theme.shadows[0],
        transition: '0.3s',
        '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 1px 10px 0 rgba(0,0,0,.12)',
        },
    },
    tripPic: {
        height: 100,
    },
    tripContent: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    dateText: {
        marginTop: -2,
        fontWeight: theme.typography.fontWeightLight,
        marginBottom: theme.spacing(1),
    },
    links: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    },
}));

const TripCard = ({trip}) => {
    const classes = useStyles();
    const auth = useSelector(state => state.firebase.auth);
    const [removeOpen, setRemoveOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    return (
        <Card className={classes.root}>
            <Link to={`/trip/${trip && trip.id}`} className={classes.links}>
                <CardActionArea>
                    {trip && trip.pictures && trip.pictures.length > 0
                    ? <CardMedia className={classes.tripPic} image={trip.pictures[0] && trip.pictures[0].url} />
                    : null}
                    <CardContent className={classes.tripContent}>
                        <Typography variant='h5' component='h2'>
                            {getTripName(trip)}
                        </Typography>
                        <Typography gutterBottom variant='caption' component='p' className={classes.dateText}>
                            {trip && trip.startDate
                            ? moment(trip.startDate.toDate()).format('MMM DD, YYYY')
                            : null}
                            {trip && trip.startDate && trip.endDate
                            ? ' - '
                            : null}
                            {trip && trip.endDate
                            ? moment(trip.endDate.toDate()).format('MMM DD, YYYY')
                            : null}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            {trip && trip.description
                            ? trip.description
                            : null}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                {auth.uid === trip.uid
                    ? (
                        <>
                            <Button size='small' color='primary' onClick={() => setEditOpen(true)}>
                                Edit
                            </Button>
                            <EditTrip
                                trip={trip}
                                tripName={getTripName(trip)}
                                editOpen={editOpen}
                                handleClose={() => setEditOpen(false)}
                            />
                            <Button size='small' color='primary' onClick={() => setRemoveOpen(true)}>
                                Remove
                            </Button>
                            <RemoveTrip
                                tripID={trip.id}
                                tripName={getTripName(trip)}
                                removeOpen={removeOpen}
                                handleClose={() => setRemoveOpen(false)}
                            />
                        </>
                    ) : null}
            </CardActions>
        </Card>
    )
};

export default TripCard;