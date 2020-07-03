import React, {useState} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import RemoveItineraryItem from './RemoveItineraryItem';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        '& > *': {
            marginRight: theme.spacing(1),
        },
    },
}));

const ItineraryItem = ({item}) => {
    const classes = useStyles();
    const [removeItemOpen, setRemoveItemOpen] = useState(false);

    return (
        <li className={classes.item}>
            <Typography>{item.place}</Typography>
            <Tooltip title='Remove Item'>
                <IconButton aria-label='delete-item' size='small' onClick={() => setRemoveItemOpen(true)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <RemoveItineraryItem
                open={removeItemOpen}
                item={item}
                handleClose={() => setRemoveItemOpen(false)}
            />
        </li>
    )
};

export default ItineraryItem;