import { RECEIVE_CURRENT_USER, RECEIVE_USER, ADD_SUB, REMOVE_SUB } from '../actions/user_actions';

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            let newCurrentUser = { [action.user.id]: action.user };
            return Object.assign({}, oldState, newCurrentUser);
        case RECEIVE_USER:
            let newUser = { [action.user.id]: action.user };
            return Object.assign({}, oldState, newUser);
        case ADD_SUB:
            newState[action.subscriberId].subscriptionIds.push(action.creatorId)
            newState[action.creatorId].subscriberCount++
            return newState
        case REMOVE_SUB:
            newState[action.subscriberId].subscriptionIds = newState[action.subscriberId].subscriptionIds.filter(id => id !== action.creatorId)
            newState[action.creatorId].subscriberCount--
            return newState
        default:
            return oldState;
    }
};

export default usersReducer;