import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Link} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        margin: 'auto',
        marginTop: theme.spacing(5),
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 5,
        padding: theme.spacing(2),
    },
    header: {
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    }
}));

const UserList = ({users}) => {
    const classes = useStyles();

    return (
        <div className='page'>
            <div className={classes.root}>
                <Typography variant='h5' className={classes.header}>Users</Typography>
                {users && users.map(user => (
                    <List key={user.id} component='nav' aria-label='user-list'>
                        <Link to={`/profile/${user.id}`} className={classes.link}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt=''
                                        src={user && user.profilePicURL}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${user && user.firstName} ${user && user.lastName}`}
                                />
                            </ListItem>
                        </Link>
                        {/* <Divider /> */}
                    </List>
                ))}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    users: state.firestore.ordered.users,
})

export default compose(
    firestoreConnect(() => [
        {collection: 'users', queryParams: ['limitToFirst=10']}
    ]),
    connect(mapStateToProps)
)(UserList);