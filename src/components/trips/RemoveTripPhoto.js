import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect} from 'react-redux-firebase';

import {deleteTripPic} from '../../store/actions/tripActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const RemoveTripPhoto = ({tripId, uid, pic, removeOpen, handleClose, deleteTripPic, firebase}) => {

    const handleDelete = () => {
        const storageRef = firebase.storage().ref().child(`${uid}/trip-pictures/${tripId}/${pic.name}`);

        storageRef.delete()
        .then(() => {
            console.log(`${pic.name} deleted`);
            deleteTripPic(tripId, pic); 
        })
        .catch((error) => {
            console.log('Picture could not be deleted', error);
            return
        })
        
        handleClose();
    };

    return (
        <Dialog
            open={removeOpen}
            onClose={handleClose}
            aria-labelledby={pic.url + '-remove-dialog-title'}
            aria-describedby={pic.url + '-remove-dialog-description'}
        >
            <DialogTitle id={pic.url + '-remove-dialog-title'}>Remove Trip</DialogTitle>
            <DialogContent>
                <DialogContentText id={pic.url + '-remove-dialog-description'}>
                    Are you sure you want to remove this photo?
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
    return {deleteTripPic: (tripId, pic) => dispatch(deleteTripPic(tripId, pic))}
};

export default compose(
    firebaseConnect(),
    connect(null, mapDispatchToProps)
)(RemoveTripPhoto);