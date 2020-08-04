import React, {useState} from 'react';
import {connect} from 'react-redux';

import {updateProfile} from '../../store/actions/authActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        '& label.Mui-focused': {
          color: theme.palette.grey[400],
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.light,
          },
      }},
}));

const EditProfile = ({user, open, handleClose, updateProfile}) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [bio, setBio] = useState(user.bio || '');

    const handleUpdate = () => {
        let updatedFields = {};

        if (firstName !== (user.firstName || '')) {
            updatedFields['firstName'] = firstName
        }

        if (lastName !== (user.lastName || '')) {
            updatedFields['lastName'] = lastName
        }

        if (bio !== (user.bio || '')) {
            updatedFields['bio'] = bio
        }

        updateProfile(user && user.id, updatedFields);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='edit-prof-dialog-title'
            aria-describedby='edit-prof-dialog-description'
        >
            <DialogTitle id='edit-prof-dialog-title'>Edit Profile Info</DialogTitle>
            <DialogContent>
                <form className={classes.form} noValidate autoComplete='off'>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                id='firstName'
                                label='First Name'
                                name='firstName'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                id='lastName'
                                label='Last Name'
                                name='lastName'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                multiline
                                fullWidth
                                id='bio'
                                label='Bio'
                                name='bio'
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary' autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color='primary'>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {updateProfile: (uid, updatedFields) => dispatch(updateProfile(uid, updatedFields))}
};

export default connect(null, mapDispatchToProps)(EditProfile);