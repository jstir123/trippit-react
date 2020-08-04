import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect} from 'react-redux-firebase';

import {addTripPics} from '../../store/actions/tripActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
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
        },
    },
}));

const AddTripPhotos = ({uid, tripId, open, handleClose, addTripPics, firebase}) => {
    const classes = useStyles();
    const inputRef = useRef();
    const [uploadError, setUploadError] = useState(false);
    const [filesUploaded, setFilesUploaded] = useState(0);
    const [filesTotal, setFilesTotal] = useState(0);

    const handleSubmit = () => {
        const storageRef = firebase.storage().ref().child(`${uid}/trip-pictures/${tripId}`);
        const files = inputRef.current.files;
        let counter = 0;
        let urls = [];
        let promises = [];

        setFilesTotal(files.length);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file);

            if (typeof file === 'undefined') {
                setUploadError(true);
                setFilesUploaded(0);
                setFilesTotal(0);
                return
            } else {
                setUploadError(false);
            }
            
            let newFileName = Math.floor(Math.random() * 1000000000).toString() + file.name;
            const uploadTask = storageRef.child(newFileName).put(file);
            const getUrl = new Promise((resolve, reject) => {
                uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error.code);
                    reject();
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURL) => {
                        counter++;
                        console.log('File available at', downloadURL);
                        urls.push({url: downloadURL, name: newFileName})
                        setFilesUploaded(counter);
                        resolve();
                    });
                })
            });
            promises.push(getUrl);
        }

        Promise.all(promises)
        .then(() => {
            addTripPics(tripId, urls);
            handleClose();
            setFilesUploaded(0);
            setFilesTotal(0);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='add-pics-dialog-title'
        >
            <DialogTitle id='add-pics-dialog-title'>Add Trip Photos</DialogTitle>
            <DialogContent>
                <form className={classes.form} noValidate autoComplete='off'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input
                                type='file'
                                variant='outlined'
                                fullWidth
                                id='img-upload'
                                label='Upload Image'
                                name='imgUpload'
                                inputRef={inputRef}
                                inputProps={{ multiple: true }}
                            />
                            {filesTotal !== 0
                            ? <Typography>{`Uploading: ${filesUploaded} of ${filesTotal} complete.`}</Typography>
                            : null}
                            {uploadError
                            ? <Typography color='error'>One or more uploads failed, please try again.</Typography>
                            : null}
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary' autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color='primary'>
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {addTripPics: (tripId, urls) => dispatch(addTripPics(tripId, urls))}
};

export default compose(
    firebaseConnect(),
    connect(null, mapDispatchToProps)
)(AddTripPhotos);