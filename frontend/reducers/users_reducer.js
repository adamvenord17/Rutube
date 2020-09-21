import { RECEIVE_CURRENT_USER } from '../actions/user_actions';

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            const newUser = { [action.user.id]: action.user };
            return Object.assign({}, oldState, newUser);
        default:
            return oldState;
    }
};

export default usersReducer;