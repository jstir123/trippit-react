import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

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
    <div className='App'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthIsLoaded>
            <NavBar />
              <Switch>
                <Route exact path='/' component={SignIn} />
                <Route path='/login' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/profile/:uid' component={Profile} />
                <Route path='/trip/:id' component={TripDetail} />
                <Route path='/users' component={UserList} />
              </Switch>
          </AuthIsLoaded>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
