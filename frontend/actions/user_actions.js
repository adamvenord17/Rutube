import * as SessionApi from '../util/session_api_util';
import * as UserApi from '../util/user_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const RECEIVE_USER = "RECEIVE_USER";

export const ADD_SUB = "ADD_SUB";
export const REMOVE_SUB = "REMOVE_SUB";

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

const addSubscription = (creatorId, subscriberId) => {
    return({
        type: ADD_SUB,
        creatorId,
        subscriberId
    })
}

const removeSubscription = (creatorId, subscriberId) => {
    return({
        type: REMOVE_SUB,
        creatorId,
        subscriberId
    })
}

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

// below is for subscriptions

export const subscribeTo = (creatorId, subscriberId) => dispatch => {
    dispatch(addSubscription(creatorId, subscriberId))
    return UserApi.subscribeTo(creatorId).then(user => dispatch(recieveUser(user)))
}

export const unsubscribeTo = (creatorId, subscriberId) => dispatch => {
    dispatch(removeSubscription(creatorId, subscriberId))
    return UserApi.unsubscribeTo(creatorId).then(user => dispatch(recieveUser(user)))
}