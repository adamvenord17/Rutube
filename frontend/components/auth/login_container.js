import { connect } from 'react-redux';
import { login } from '../../actions/user_actions';
import LoginForm from './login_form';
import { clearErrors } from "../../actions/error_actions";

const mSTP = state => {
    return({
        formType: 'Login',
        errors: state.errors.session,
        currentUser: state.session.id
    });
};

const mDTP = dispatch => {
    return({
        processForm: (user) => dispatch(login(user)),
        clearErrors: () => dispatch(clearErrors())
    });
};

export default connect(mSTP, mDTP)(LoginForm);
