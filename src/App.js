import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AuthIsLoaded from './components/common/AuthIsLoaded';
import Profile from './components/pages/Profile';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import NavBar from './components/common/NavBar';
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './config/theme';

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
          </AuthIsLoaded>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
