import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ImgsViewer from 'react-images-viewer';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(3),
    },
    gridList: {
        width: '100%',
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    pic: {

    },
}));

const DetailPicList = ({pics, isLoaded}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    let images = [];

    if (pics) {
        images = pics.map(pic => ({src: pic}))
    }

    const handleClick = (pic) => {
        setImgIndex(pics.indexOf(pic));
        setOpen(true);
    };
    
    return (
        <div className={classes.root}>
            {isLoaded
             ? (
                 pics && pics.length > 0
                  ? (
                        <>
                            <GridList className={classes.gridList} cols={3}>
                                {pics.map((pic) => (
                                    <GridListTile key={pic} cols={1}>
                                        <img
                                            src={pic}
                                            alt=''
                                            onClick={() => handleClick(pic)}
                                            className={classes.pic}
                                        />
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
                  : null
               )
             : null}
        </div>
    );
}

export default DetailPicList;