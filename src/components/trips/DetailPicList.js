import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ImgsViewer from 'react-images-viewer';

import AddTripPhotos from './AddTripPhotos';
import DeleteTripPhotoBtn from './DeleteTripPhotoBtn';

import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    header: {
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    gridList: {
        width: '100%',
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    pic: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
    emptyText: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        padding: theme.spacing(2),
    },
}));

const DetailPicList = ({trip, tripId}) => {
    const classes = useStyles();
    const auth = useSelector(state => state.firebase.auth);
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const pics = trip && trip.pictures;
    let images = [];

    if (pics) {
        images = pics.map(pic => ({src: pic.url}))
    }

    const handleClick = (pic) => {
        setImgIndex(pics.indexOf(pic));
        setOpen(true);
    };
    
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant='h4' className={classes.header}>Photos</Typography>
                {auth.uid === (trip && trip.uid)
                    ? (
                        <>
                            <Tooltip title='Add Photos'>
                                <IconButton aria-label='add' onClick={() => setAddOpen(true)}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Tooltip>
                            <AddTripPhotos
                                uid={trip && trip.uid}
                                tripId={tripId}
                                open={addOpen}
                                handleClose={() => setAddOpen(false)}
                            />
                        </>
                    ) : null}
            </div>
            {pics && pics.length > 0
            ? (
                <>
                    <GridList className={classes.gridList} cols={3}>
                        {pics.map((pic) => (
                            <GridListTile key={pic.url} cols={1}>
                                <img
                                    src={pic.url}
                                    alt=''
                                    onClick={() => handleClick(pic)}
                                    className={classes.pic}
                                />
                                {auth.uid === (trip && trip.uid)
                                    ? (
                                        <DeleteTripPhotoBtn
                                            uid={trip && trip.uid}
                                            tripId={tripId}
                                            pic={pic}
                                        />
                                    ) : null}
                            </GridListTile>
                        ))}
                    </GridList>
                    <ImgsViewer
                        imgs={images}
                        isOpen={open}
                        onClose={() => setOpen(false)}
                        currImg={imgIndex}
                        imgCountSeparator=' of '
                        backdropCloseable={true}
                        onClickNext={() => setImgIndex(imgIndex + 1)}
                        onClickPrev={() => setImgIndex(imgIndex - 1)}
                    />
                </>
            )
            : (
                <div className={classes.emptyText}>
                    <Typography>
                        Looks like there isn't anything here yet!
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default DetailPicList;