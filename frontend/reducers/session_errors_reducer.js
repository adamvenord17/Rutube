import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER } from "../actions/user_actions";

const sessionErrorsReducer = (state = [], action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_ERRORS:
            return [...action.errors.responseJSON];
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
}

export default sessionErrorsReducer;