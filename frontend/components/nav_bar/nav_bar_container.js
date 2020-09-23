import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { logout } from '../../actions/user_actions';

const mSTP = state => {
    return {
        currentUser: state.entities.users[state.session.currentUserId]
    };
};

const mDTP = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default connect(mSTP, mDTP)(NavBar);