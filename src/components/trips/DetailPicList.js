import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
}));

const DetailPicList = ({pics, isLoaded}) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            {isLoaded
             ? (
                 pics && pics.length > 0
                  ? (
                        <GridList className={classes.gridList} cols={3}>
                            {pics.map((pic) => (
                                <GridListTile key={pic} cols={1}>
                                    <img src={pic} alt='' />
                                </GridListTile>
                            ))}
                        </GridList>
                    )
                  : null
               )
             : null}
        </div>
    );
}

export default DetailPicList;