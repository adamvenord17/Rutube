import { connect } from 'react-redux';
import VideoIndexItem from './video_index_item';
import { fetchUser } from '../../actions/user_actions';
import { withRouter } from  'react-router-dom';

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

export default withRouter(connect(mSTP, mDTP)(VideoIndexItem));