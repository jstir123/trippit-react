import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {getTripName} from '../../utils/utils';
import RemoveTrip from './RemoveTrip';
import EditTrip from './EditTrip';

const useStyles = makeStyles((theme) => ({
    root: {
        // height: 210,
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        borderRadius: 5,
        border: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: theme.shadows[0],//'0 1px 10px 0 rgba(0,0,0,.12)',
        transition: '0.3s',
        '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 1px 10px 0 rgba(0,0,0,.12)',//'0 1px 10px 0 rgba(0,0,0,.30)',
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
    const [removeOpen, setRemoveOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.tripPic}
                image="https://specials-images.forbesimg.com/imageserve/5e086a2f25ab5d0007cf74ec/960x0.jpg?cropX1=1&cropX2=1867&cropY1=0&cropY2=1244"
            />
            <Link to={`/trip/${trip.id}`} className={classes.links}>
                <CardActionArea>
                    <CardContent className={classes.tripContent}>
                        <Typography variant="h5" component="h2">
                            {getTripName(trip)}
                        </Typography>
                        <Typography gutterBottom variant="caption" component="p" className={classes.dateText}>
                            {trip.startDate
                             ? moment(trip.startDate.toDate()).format("MMM DD, YYYY")
                             : null}
                            {trip.startDate && trip.endDate
                             ? ' - '
                             : null}
                            {trip.endDate
                             ? moment(trip.endDate.toDate()).format("MMM DD, YYYY")
                             : null}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {trip.description
                            ? trip.description
                            : null}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                <Button size="small" color="primary" onClick={() => setEditOpen(true)}>
                    Edit
                </Button>
                <EditTrip
                    trip={trip}
                    tripName={getTripName(trip)}
                    editOpen={editOpen}
                    handleClose={() => setEditOpen(false)}
                />
                <Button size="small" color="primary" onClick={() => setRemoveOpen(true)}>
                    Remove
                </Button>
                <RemoveTrip
                    tripID={trip.id}
                    tripName={getTripName(trip)}
                    removeOpen={removeOpen}
                    handleClose={() => setRemoveOpen(false)}
                />
            </CardActions>
        </Card>
    )
};

export default TripCard;