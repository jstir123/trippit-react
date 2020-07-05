import React, {useState} from 'react';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveTripPhoto from './RemoveTripPhoto';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    titleBar: {
        background: 'none',
        cursor: 'pointer',
    },
    deleteIcon: {
        color: theme.palette.common.white,
    },
}));

const DeleteTripPhotoBtn = ({uid, tripId, pic}) => {
    const classes = useStyles();
    const [removeOpen, setRemoveOpen] = useState(false);

    return (
        <>
            <GridListTileBar
                classes={{root: classes.titleBar}}
                actionIcon={
                    <Tooltip title='Delete Photo'>
                        <IconButton onClick={() => setRemoveOpen(true)}>
                            <DeleteIcon className={classes.deleteIcon} />
                        </IconButton>
                    </Tooltip>
                }
            />
            <RemoveTripPhoto
                uid={uid}
                tripId={tripId}
                pic={pic}
                removeOpen={removeOpen}
                handleClose={() => setRemoveOpen(false)}
            />
        </>
    )
};

export default DeleteTripPhotoBtn;