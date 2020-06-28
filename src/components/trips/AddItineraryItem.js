import React, {useState} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {addItineraryItem} from '../../store/actions/tripActions';
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
        }
    },
}));

const AddItineraryItem = ({tripId, addOpen, handleClose, addItineraryItem}) => {
    const classes = useStyles();
    const [type, setType] = useState('restaurant');
    const [isRecommended, setIsRecommended] = useState(true);
    const [placeName, setPlaceName] = useState('');
    const [formError, setFormError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!placeName) {
            return setFormError(true);
        }

        addItineraryItem({
            tripId,
            type,
            isRecommended,
            place: placeName
        })

        handleClose();
        setFormError(false);
        setType('restaurant');
        setIsRecommended(true);
        setPlaceName('');
    }

    return (
        <Dialog
            open={addOpen}
            onClose={handleClose}
            aria-labelledby='add-item'
            // onEntered={() => document.querySelector('#location').focus()}
        >
            <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit}>
                <DialogTitle id='add-item'>Add an Itinerary Item</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl variant='outlined' fullWidth>
                                <InputLabel id='type-label'>
                                    Place Type
                                </InputLabel>
                                <Select
                                    labelId='type-label'
                                    id='type'
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label='Place Type'
                                >
                                    <MenuItem value={'restaurant'}>Restaurant</MenuItem>
                                    <MenuItem value={'lodging'}>Hotel</MenuItem>
                                    <MenuItem value={'bar'}>Bar</MenuItem>
                                    <MenuItem value={'location'}>Location</MenuItem>
                                    <MenuItem value={'activity'}>Activity</MenuItem>
                                    <MenuItem value={'poi'}>Point of Interest</MenuItem>
                                    <MenuItem value={'other'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant='outlined' fullWidth>
                                <InputLabel id='recommended-label'>
                                    Recommended
                                </InputLabel>
                                <Select
                                    labelId='recommended-label'
                                    id='recommended'
                                    value={isRecommended}
                                    onChange={(e) => setIsRecommended(e.target.value)}
                                    label='Recommended'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                variant='outlined'
                                fullWidth
                                id='place-name'
                                label='Place Name'
                                name='placeName'
                                value={placeName}
                                onChange={(e) => setPlaceName(e.target.value)}
                            />
                            {formError
                             ? <FormHelperText error={true}>'Place Name' cannot be blank</FormHelperText>
                             : null}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button type='submit' color='primary'>
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {addItineraryItem: (item) => dispatch(addItineraryItem(item))}
};

export default connect(null, mapDispatchToProps)(AddItineraryItem);