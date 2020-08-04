import React from 'react';
import {connect} from 'react-redux';

import {deleteTrip} from '../../store/actions/tripActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const RemoveTrip = ({tripID, tripName, removeOpen, handleClose, deleteTrip}) => {

    const handleDelete = () => {
        deleteTrip(tripID);
        handleClose();
    };

    return (
        <Dialog
            open={removeOpen}
            onClose={handleClose}
            aria-labelledby={tripID + '-remove-dialog-title'}
            aria-describedby={tripID + '-remove-dialog-description'}
        >
            <DialogTitle id={tripID + '-remove-dialog-title'}>Remove Trip</DialogTitle>
            <DialogContent>
                <DialogContentText id={tripID + '-remove-dialog-description'}>
                    Are you sure you want to remove your trip to <b>{tripName}?</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary">
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    
    )
};

const mapDispatchToProps = (dispatch) => {
    return {deleteTrip: (tripID) => dispatch(deleteTrip(tripID))}
};

export default connect(null, mapDispatchToProps)(RemoveTrip);