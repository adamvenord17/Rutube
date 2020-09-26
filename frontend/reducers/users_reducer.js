import { RECEIVE_CURRENT_USER, RECEIVE_USER } from '../actions/user_actions';

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            let newCurrentUser = { [action.user.id]: action.user };
            return Object.assign({}, oldState, newCurrentUser);
        case RECEIVE_USER:
            let newUser = { [action.user.id]: action.user };
            return Object.assign({}, oldState, newUser);
        default:
            return oldState;
    }
};

export default usersReducer;