import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 450,
      },
    input: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
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

const SearchBar = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.input}>
                <TextField
                    id='search'
                    label='Search'
                    size='small'
                    fullWidth
                    />
            </div>
        </div>
    )
};

export default SearchBar;