import { connect } from 'react-redux';
import { signup } from '../../actions/user_actions';
import SignupForm from './signup_form';
import { clearErrors } from "../../actions/error_actions";

const mSTP = state => {
    return ({
        formType: 'Sign Up',
        errors: state.errors.session,
        currentUser: state.session.id
    });
};

const mDTP = dispatch => {
    return ({
        processForm: (user) => dispatch(signup(user)),
        clearErrors: () => dispatch(clearErrors())
    });
};

export default connect(mSTP, mDTP)(SignupForm);
