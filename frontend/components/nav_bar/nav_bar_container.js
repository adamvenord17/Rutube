import { connect } from 'react-redux';
import NavBar from './nav_bar';

const mSTP = state => {
    return {
        currentUser: state.entities.users[state.session.currentUserId]
    };
};

// const mDTP = dispatch => {
//     return {

//     }
// }

export default connect(mSTP)(NavBar);