import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 500,
      },
    input: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
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

const SearchBar = ({setSearchInput}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.input}>
                <TextField
                    variant='outlined'
                    id='search'
                    label='Search'
                    size='small'
                    fullWidth
                    onChange={(e) => setSearchInput(e.target.value)}
                    />
            </div>
        </div>
    )
};

export default SearchBar;