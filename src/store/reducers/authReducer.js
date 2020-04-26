const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type){
    case 'LOGIN_SUCCESS':
      console.log('Login success');
      return {
        ...state,
        authError: null
      }
    case 'LOGIN_ERROR':
      console.log('Login error');
      return {
        ...state,
        authError: 'Login failed. Please enter a valid email and password.'
      }
    case 'SIGNOUT_SUCCESS':
      console.log('Signout success');
      return state;
    case 'SIGNOUT_ERROR':
      console.log('Signout error');
      return state;
    case 'SIGNUP_SUCCESS':
      console.log('Signup success');
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('Signup error');
      return {
        ...state,
        authError: action.error.message
      }
    case 'UPDATE_PROFILE':
      console.log('Update profile', action.fields);
      return state;
    case 'UPDATE_PROFILE_ERROR':
      console.log('Update profile error', action.error);
      return state;
    case 'CLEAR_BIO':
      console.log('Clear bio');
      return state;
    case 'CLEAR_BIO_ERROR':
      console.log('Clear bio error', action.error);
      return state;
    case 'ADD_FOLLOW':
      console.log('Add follow');
      return state;
    case 'ADD_FOLLOW_ERROR':
      console.log('Add follow error', action.error);
      return state;
    case 'DELETE_FOLLOW':
      console.log('Delete follow');
      return state;
    case 'DELETE_FOLLOW_ERROR':
      console.log('Delete follow error', action.error);
      return state;
    case 'UPDATE_PROF_PIC':
      console.log('Update profile pic URL');
      return state;
    case 'UPDATE_PROF_PIC_ERROR':
      console.log('Update profile pic URL error', action.error);
      return state;
    default:
      return state;
  }
}

export default authReducer;
