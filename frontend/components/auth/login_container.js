import { connect } from 'react-redux';
import { login } from '../../actions/user_actions';
import SessionForm from './session_form';

const mSTP = state => {
    return({
        formType: 'Login',
        errors: state.errors.session,
        currentUser: state.session.id
    });
};

const mDTP = dispatch => {
    return({
        processForm: (user) => dispatch(login(user))
    });
};

export default connect(mSTP, mDTP)(SessionForm);
