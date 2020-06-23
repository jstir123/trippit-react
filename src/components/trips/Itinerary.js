import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HotelIcon from '@material-ui/icons/Hotel';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import PlaceIcon from '@material-ui/icons/Place';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import GradeIcon from '@material-ui/icons/Grade';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    header: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    panel: {
        boxShadow: 'none',
        border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    panelSummary: {
        marginBottom: theme.spacing(-2.5),
    },
    panelText: {
        marginLeft: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
    },
}));

const Itinerary = ({itinerary}) => {
    const classes = useStyles();
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
        itinerary.forEach(item => {
            usedTypes.add(item.type)
        });
    }

    return (
        <div className={classes.root}>
            <Typography variant='h4' className={classes.header}>Itinerary</Typography>
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
                                    <ul>
                                        {itemList.map(item => (
                                            <li key={item.id}>
                                                <Typography>{item.place}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Itinerary;