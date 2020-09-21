import * as SessionApi from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveCurrentUser = user => {
    return ({
        type: RECEIVE_CURRENT_USER,
        user
    });
};

const logoutCurrentUser = () => {
    return ({
        type: LOGOUT_CURRENT_USER,
    });
};

const receiveErrors = errors => {
    return ({
        type: RECEIVE_ERRORS,
        errors
    });
};

export const login = user => dispatch => {
    return (SessionApi.login(user).then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveErrors(errors))))
};

export const logout = () => dispatch => {
    return (SessionApi.logout().then(() => dispatch(logoutCurrentUser()), errors => dispatch(receiveErrors(errors))))
};

export const signup = user => dispatch => {
    return (SessionApi.signup(user).then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveErrors(errors))))
};
