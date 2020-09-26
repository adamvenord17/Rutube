import * as SessionApi from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const RECEIVE_USER = "RECEIVE_USER";

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

const receiveUserErrors = errors => {
    return ({
        type: RECEIVE_USER_ERRORS,
        errors
    });
};

const receiveUser = user => {
    return({
        type: RECEIVE_USER,
        user
    });
};

export const login = user => dispatch => {
    return (SessionApi.login(user).then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveUserErrors(errors))))
};

export const logout = () => dispatch => {
    return (SessionApi.logout().then(() => dispatch(logoutCurrentUser()), errors => dispatch(receiveUserErrors(errors))))
};

export const signup = user => dispatch => {
    return (SessionApi.signup(user).then(user => dispatch(receiveCurrentUser(user)), errors => dispatch(receiveUserErrors(errors))))
};

export const fetchUser = (userId) => dispatch => {
    return (SessionApi.fetchUser(userId).then(user => dispatch(receiveUser(user)), errors => dispatch(receiveUserErrors(errors))))
};

