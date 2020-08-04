import React from 'react';
import {connect} from 'react-redux';

import {deleteItineraryItem} from '../../store/actions/tripActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const RemoveItineraryItem = ({item, open, handleClose, deleteItineraryItem}) => {

    const handleDelete = () => {
        deleteItineraryItem(item.id);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby={item && item.id + '-remove-dialog-title'}
            aria-describedby={item && item.id + '-remove-dialog-description'}
        >
            <DialogTitle id={item && item.id + '-remove-dialog-title'}>Remove Place</DialogTitle>
            <DialogContent>
                <DialogContentText id={item && item.id + '-remove-dialog-description'}>
                    Are you sure you want to remove <b>{item.place}</b> from your itinerary?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary' autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleDelete} color='primary'>
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    
    )
};

const mapDispatchToProps = (dispatch) => {
    return {deleteItineraryItem: (itemId) => dispatch(deleteItineraryItem(itemId))}
};

export default connect(null, mapDispatchToProps)(RemoveItineraryItem);