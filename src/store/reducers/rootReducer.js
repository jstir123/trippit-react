import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';

import authReducer from './authReducer';
import tripReducer from './tripReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  trip: tripReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
