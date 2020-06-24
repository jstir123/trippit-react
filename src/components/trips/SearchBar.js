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
        // transition: '0.3s',
        // '&:hover': {
        //     transform: 'scale(1.01)',
        // },
        '& label.Mui-focused': {
            color: theme.palette.grey[400],
          },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderWidth: 1,
                borderColor: theme.palette.secondary.light,
            },
        },
    },
    inputBorder: {
        // borderColor: 'rgba(0, 0, 0, 0.12)',
        // borderStyle: 'none',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: 20,
        // boxShadow: '0 1px 10px 1px rgba(0,0,0,.1)',
    },
    inputLabel: {
        color: theme.palette.grey[400],
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
                    placeholder='Search trips...'
                    size='small'
                    fullWidth
                    onChange={(e) => setSearchInput(e.target.value)}
                    InputLabelProps={{
                        classes: {root: classes.inputLabel}
                    }}
                    InputProps={{
                        classes: {notchedOutline: classes.inputBorder}
                    }}
                    />
            </div>
        </div>
    )
};

export default SearchBar;