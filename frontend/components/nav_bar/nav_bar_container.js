import { connect } from 'react-redux';
import NavBar from './nav_bar';

const mSTP = state => {
    return {
        currentUser: state.entities.users[state.session.current_user_id]
    };
};

// const mDTP = dispatch => {
//     return {

//     }
// }

export default connect(mSTP)(NavBar);