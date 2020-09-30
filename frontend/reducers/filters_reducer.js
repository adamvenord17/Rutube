import { UPDATE_FILTER } from '../actions/filter_actions';

const defaultFilters = Object.freeze({
    bounds: '',
});

const filtersReducer = (state = defaultFilters, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    if (action.type === UPDATE_FILTER) {
        newState[action.filter] = action.value;
        return newState;
    } else {
        return state;
    }
};

export default filtersReducer;