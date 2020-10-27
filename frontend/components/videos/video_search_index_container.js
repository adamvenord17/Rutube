import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import { fetchVideos } from '../../actions/video_actions';
import VideoSearchIndex from './video_search_index';

const mSTP = state => {
    return({
        videos: state.entities.videos,
        users: state.entities.users,
        bounds: state.ui.filters.bounds
    });
};

const mDTP = dispatch => {
    return({
        fetchVideos: bounds => dispatch(fetchVideos(bounds)),
        fetchUser: userId => dispatch(fetchUser(userId)),

    });
};

export default connect(mSTP, mDTP)(VideoSearchIndex);