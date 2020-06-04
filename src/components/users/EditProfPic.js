import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firebaseConnect} from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {updateProfilePic} from '../../store/actions/authActions';

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
        },
    },
}));

const EditProfPic = ({uid, open, handleClose, updateProfilePic, firebase}) => {
    const classes = useStyles();
    const inputRef = useRef();
    const [uploadError, setUploadError] = useState(false);
    const [uploadPercent, setUploadPercent] = useState(0);

    const handleUpdate = () => {
        const storageRef = firebase.storage().ref().child(`${uid}/profile-picture`);
        const file = inputRef.current.files && inputRef.current.files[0];

        if (typeof file === 'undefined') {
            setUploadError(true);
            return
        }
        setUploadError(false);

        storageRef.listAll().then((resp) => {
            resp.items.forEach((item) => {
                item.delete().then(() => {
                    console.log(`${item.name} deleted`);
                }).catch((error) => {
                    console.log('Profile picture could not be deleted.', error);
                    setUploadError(true);
                    return
                })
            })
        }).then(() => {
            const uploadTask = storageRef.child(file.name).put(file);
      
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log('Upload is ' + progress + '% done');
                    setUploadPercent(progress);
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
                }, (error) => {
                    setUploadError(true);
                    console.log(error.code);
                 }, () => {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        updateProfilePic(uid, downloadURL);
                        handleClose();
                        setUploadPercent(0);
                    });
                }
            );
        })
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='edit-profpic-dialog-title'
        >
            <DialogTitle id='edit-profpic-dialog-title'>Update Profile Picture</DialogTitle>
            <DialogContent>
                <form className={classes.form} noValidate autoComplete='off'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input
                                type='file'
                                variant='outlined'
                                fullWidth
                                id='imgUpload'
                                label='Upload Image'
                                name='imgUpload'
                                inputRef={inputRef}
                            />
                            {uploadPercent !== 0
                             ? <Typography>{`Uploading: ${uploadPercent}% complete.`}</Typography>
                             : null}
                            {uploadError
                             ? <Typography color='error'>Upload failed, please try again.</Typography>
                             : null}
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
    return {updateProfilePic: (uid, url) => dispatch(updateProfilePic(uid, url))}
};

export default compose(
    firebaseConnect(),
    connect(null, mapDispatchToProps)
)(EditProfPic);