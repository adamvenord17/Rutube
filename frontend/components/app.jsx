import React from 'react';
import { Route, Link } from 'react-router-dom';
import SignupContainer from './auth/signup_container';
import LoginContainer from './auth/login_container';
import { AuthRoute, ProtectedRoute } from '../util/route_utils';
import GreetingContainer from './greeting/greeting_container';
import NavBarContainer from './nav_bar/nav_bar_container';

const App = () => (
    <>
        <NavBarContainer />
        <header>
            <h1>Hello there, this is the App!</h1>
            <GreetingContainer />
        </header>
        <AuthRoute path="/login" component={LoginContainer} />
        <AuthRoute path="/signup" component={SignupContainer} />
        <Route exact path="/" render={() => <span>MainPage</span>} />
    </>
)

export default App;