import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mSTP = state => {
    return ({
        loggedIn: Boolean(state.session.current_user_id)
    });
};

const Auth = ({ loggedIn, path, component: Component }) => {
    return (<Route path={path}
        render={props => {
            return loggedIn ? <Redirect to="/" /> : <Component {...props} />;
        }} />)
}

export const AuthRoute = withRouter(connect(mSTP)(Auth));

const Protected = ({ loggedIn, path, component: Component }) => {
    return (<Route path={path}
        render={props => { return loggedIn ? <Component {...props} /> : <Redirect to="/login" /> }}
    />)
}

export const ProtectedRoute = withRouter(connect(mSTP)(Protected));