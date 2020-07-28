import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import AuthIsLoaded from './components/common/AuthIsLoaded';
import Profile from './components/pages/Profile';
import TripDetail from './components/pages/TripDetail';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import NavBar from './components/common/NavBar';
import UserList from './components/pages/UserList';
import {theme} from './config/theme';

import {ThemeProvider} from '@material-ui/core/styles';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthIsLoaded>
            <NavBar />
            <Route exact path='/' component={SignIn} />
            <Route exact path='/login' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/profile/:uid' component={Profile} />
            <Route exact path='/trip/:id' component={TripDetail} />
            <Route exact path='/users' component={UserList} />
          </AuthIsLoaded>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
