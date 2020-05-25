import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/core/styles';
import PlacesSearch from './PlacesSearch';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        '& label.Mui-focused': {
          color: '#bdbdbd',
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
          },
      }},
}));

const AddTrip = ({open, handleClose}) => {
    const classes = useStyles();
    const [locationBlank, setLocationBlank] = useState(false);
    const [coordsBlank, setCoordsBlank] = useState(false);
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [coords, setCoords] = useState('');
    const [type, setType] = useState('city');

    const handleSubmit = (e) => {
        e.preventDefault();
        let newTrip = {location, city, state, country,
                       startDate, endDate, description, coords}

        if (location === '') {
            setLocationBlank(true);
            return null;
        } else {
            setLocationBlank(false);
        }

        if (coords === '') {
            setCoordsBlank(true);
            return null;
        } else {
            setCoordsBlank(false);
        }

        console.log(newTrip);
        handleClose();
    }

  return (
    <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            onEntered={() => document.querySelector('#location').focus()}
        >
            <DialogTitle id="form-dialog-title">Add a Trip</DialogTitle>
            <DialogContent>
                <form className={classes.form} noValidate autoComplete='off'>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl variant='outlined' fullWidth>
                                <InputLabel id='typeLabel'>
                                    Location Type
                                </InputLabel>
                                <Select
                                    labelId='typeLabel'
                                    id='type'
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label='Location Type'
                                >
                                    <MenuItem value={'city'}>City</MenuItem>
                                    <MenuItem value={'country'}>Country</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <PlacesSearch
                                type={type}
                                setLocation={setLocation}
                                setCity={setCity}
                                setState={setState}
                                setCountry={setCountry}
                                setCoords={setCoords}
                                error={locationBlank || coordsBlank}
                            />
                            {locationBlank
                            ? <FormHelperText id='fieldError' error={true}>Please select a location</FormHelperText>
                            : null}
                            {coordsBlank
                            ? <FormHelperText id='fieldError' error={true}>We couldn't find that location!</FormHelperText>
                            : null}
                        </Grid>
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
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} on color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    </>
  );
}

export default AddTrip;