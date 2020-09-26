import { connect } from 'react-redux';
import VideoIndexItem from './video-index-item';
import { fetchUser } from '../../actions/user_actions';

const mSTP = (state, ownProps) => {
    return {
        video: ownProps.video,
        users: state.entities.users
    };
};

const mDTP = dispatch => {
    return ({
        fetchUser: (userId) => dispatch(fetchUser(userId))
    });
};

export default connect(mSTP, mDTP)(VideoIndexItem);