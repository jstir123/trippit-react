import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HotelIcon from '@material-ui/icons/Hotel';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import PlaceIcon from '@material-ui/icons/Place';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import GradeIcon from '@material-ui/icons/Grade';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddItineraryItem from './AddItineraryItem';
import ItineraryItem from './ItineraryItem';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    header: {
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    panel: {
        boxShadow: theme.shadows[0],
        border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    panelSummary: {
        marginBottom: theme.spacing(-2.5),
    },
    panelText: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
    },
    emptyText: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        padding: theme.spacing(2),
    },
    list: {
        width: '100%',
    },
}));

const Itinerary = ({itinerary, tripId}) => {
    const classes = useStyles();
    const [addOpen, setAddOpen] = useState(false);
    let usedTypes = new Set();

    const headerOptions = {
        lodging: {text: 'Hotels', icon: <HotelIcon />},
        restaurant: {text: 'Restaurants', icon: <RestaurantIcon />},
        bar: {text: 'Bars', icon: <LocalBarIcon />},
        location: {text: 'Locations', icon: <PlaceIcon />},
        poi: {text: 'POIs', icon: <WhatshotIcon />},
        activity: {text: 'Activities', icon: <DirectionsBikeIcon />},
        other: {text: 'Other', icon: <GradeIcon />}
      }

    if (itinerary) {

        itinerary.forEach(item => usedTypes.add(item.type));

        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <Typography variant='h4' className={classes.header}>Itinerary</Typography>
                    <Tooltip title='Add Item'>
                        <IconButton aria-label='add' onClick={() => setAddOpen(true)}>
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                    <AddItineraryItem
                        tripId={tripId}
                        addOpen={addOpen}
                        handleClose={() => setAddOpen(false)}
                    />
                </div>
                {itinerary.length > 0
                ? (
                    <div>
                        {
                            Array.from(usedTypes).map(type => {
                                let itemList = itinerary.filter(item => (
                                    item.type === type
                                ));
                                return (
                                    <ExpansionPanel expanded={true} key={type} className={classes.panel}>
                                        <ExpansionPanelSummary className={classes.panelSummary} >
                                            {headerOptions[type]['icon']}
                                            <Typography className={classes.panelText}>
                                                {headerOptions[type]['text']}
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <ul className={classes.list}>
                                                {itemList.map(item => <ItineraryItem item={item} key={item.id} />)}
                                            </ul>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            })
                        }
                    </div>
                )
                : (
                    <div className={classes.emptyText}>
                        <Typography>
                            Looks like there isn't anything here yet!
                        </Typography>
                    </div>
                )}
            </div>
        )
    } else {
        return null
    }
};

export default Itinerary;