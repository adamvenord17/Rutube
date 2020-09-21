import { connect } from 'react-redux';
import { signup } from '../../actions/user_actions';
import SessionForm from './session_form';

const mSTP = state => {
    return ({
        formType: 'Sign Up',
        errors: state.errors.session,
        currentUser: state.session.id
    });
};

const mDTP = dispatch => {
    return ({
        processForm: (user) => dispatch(signup(user))
    });
};

export default connect(mSTP, mDTP)(SessionForm);
