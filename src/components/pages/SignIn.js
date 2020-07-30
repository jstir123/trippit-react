import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';

import {signIn} from '../../store/actions/authActions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
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
  }},
  submit: {
    margin: theme.spacing(3, 0, 2),
    boxShadow: theme.shadows[0],
  },
  link: {
    color: theme.palette.text.primary,
  },
  errorText: {
    color: theme.palette.error.dark,
  }
}));

const SignIn = ({auth, authError, signIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    signIn({email, password});
    e.target.reset();
  }

  if (auth.uid) return <Redirect to={`/profile/${auth.uid}`} />

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='password'
            label='Password'
            name='password'
            type='password'
            autoComplete='current-password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {authError ? (
            <Typography className={classes.errorText}>
              {authError}
            </Typography>
          ) : (null)}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Login
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Link to='/signup' className={classes.link}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'Copyright © '}
          <Link to='/'>
            Trippit.co
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
