import React from 'react';
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

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2.5),
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14),'
                    + '0px 1px 3px 0px rgba(0,0,0,0.12), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    tripPic: {
        height: 140,
    }
}));

const TripCard = ({trip}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.tripPic}
                    image="https://specials-images.forbesimg.com/imageserve/5e086a2f25ab5d0007cf74ec/960x0.jpg?cropX1=1&cropX2=1867&cropY1=0&cropY2=1244"
                />
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {getTripName(trip)}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="p">
                        {moment(trip.startDate.toDate()).format("MMM DD, YYYY")}
                        {' - '}
                        {moment(trip.endDate.toDate()).format("MMM DD, YYYY")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {trip.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
                </Button>
                <Button size="small" color="primary">
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
};

export default TripCard;