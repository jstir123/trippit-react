import authReducer from './authReducer';
import tripReducer from './tripReducer';
import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  trip: tripReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
