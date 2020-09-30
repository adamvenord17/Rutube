import { connect } from 'react-redux';
import { updateFilter } from '../../actions/filter_actions';
import SearchBar from './search_bar';
import { withRouter } from 'react-router-dom'

const mSTP = state => {
    return({
        bounds: state.ui.filters.bounds
    });
};

const mDTP = dispatch => {
    return({
        updateFilter: (value) => dispatch(updateFilter('bounds', value))
    });
};

export default withRouter(connect(mSTP, mDTP)(SearchBar));