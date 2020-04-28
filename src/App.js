import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import AuthIsLoaded from './components/common/AuthIsLoaded';
import Profile from './components/pages/Profile';
import SignIn from './components/pages/SignIn';
import NavBar from './components/common/NavBar';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthIsLoaded>
          <NavBar />
          <Route exact path='/' component={Profile} />
          <Route exact path='/login' component={SignIn} />
          <Route exact path='/profile/:uid' component={Profile} />
        </AuthIsLoaded>
      </BrowserRouter>
    </div>
  );
}

export default App;
