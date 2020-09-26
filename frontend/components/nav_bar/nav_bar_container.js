import { connect } from 'react-redux';
import NavBar from './nav_bar';
import { logout } from '../../actions/user_actions';
import { openModal } from '../../actions/modal_actions';

const mSTP = state => {
    return {
        currentUser: state.entities.users[state.session.currentUserId]
    };
};

const mDTP = dispatch => {
    return {
        logout: () => dispatch(logout()),
        openModal: () => dispatch(openModal('upload')),
    };
};

export default connect(mSTP, mDTP)(NavBar);