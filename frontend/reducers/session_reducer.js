import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/user_actions";

const sessionReducer = (state = { current_user_id: null }, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return { current_user_id: action.user.id };
        case LOGOUT_CURRENT_USER:
            return { current_user_id: null };
        default:
            return state;
    }
};

export default sessionReducer;