import { connect } from 'react-redux';
import Greeting from './greeting';
import { logout } from '../../actions/user_actions';

const mSTP = state => {
    return ({
        currentUser: state.entities.users[state.session.current_user_id]
    })
}

const mDTP = dispatch => {
    return ({
        logout: () => dispatch(logout())
    })
}

export default connect(mSTP, mDTP)(Greeting);