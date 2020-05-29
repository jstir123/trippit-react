import React, {useState} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/core/styles';
import {updateTrip} from '../../store/actions/tripActions';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        '& label.Mui-focused': {
          color: '#bdbdbd',
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.light,
          },
      }},
}));

const EditTrip = ({trip, tripName, editOpen, handleClose, updateTrip}) => {
    const classes = useStyles();
    const [startDate, setStartDate] = useState(moment(trip.startDate.toDate()).format('MM/DD/YYYY'));
    const [endDate, setEndDate] = useState(moment(trip.endDate.toDate()).format('MM/DD/YYYY'));
    const [description, setDescription] = useState(trip.description);

    const handleUpdate = () => {
        let updatedFields ={};

        if (startDate !== moment(trip.startDate.toDate()).format('MM/DD/YYYY')) {
            updatedFields['startDate'] = new Date(startDate);
        }

        if (endDate !== moment(trip.endDate.toDate()).format('MM/DD/YYYY')) {
            updatedFields['endDate'] = new Date(endDate);
        }

        if (description !== trip.description) {
            updatedFields['description'] = description;
        }

        updateTrip(trip.id, updatedFields);
        handleClose();
    };

    return (
        <Dialog
            open={editOpen}
            onClose={handleClose}
            aria-labelledby={trip.id + '-edit-dialog-title'}
            aria-describedby={trip.id + '-edit-dialog-description'}
        >
            <DialogTitle id={trip.id + '-edit-dialog-title'}>Edit Trip</DialogTitle>
            <DialogContent>
                <DialogContentText id={trip.id + '-edit-dialog-description'}>
                    Update your trip to <b>{tripName}.</b>
                </DialogContentText>
                <form className={classes.form} noValidate autoComplete='off'>
                    <Grid container spacing={2}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    margin='normal'
                                    id='startDate'
                                    label='Start Date'
                                    format='MM/DD/YYYY'
                                    fullWidth
                                    value={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    margin='normal'
                                    id='endDate'
                                    label='End Date'
                                    format='MM/DD/YYYY'
                                    fullWidth
                                    value={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                multiline
                                fullWidth
                                id='description'
                                label='Trip Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
    return {updateTrip: (tripID, updatedFields) => dispatch(updateTrip(tripID, updatedFields))}
};

export default connect(null, mapDispatchToProps)(EditTrip);