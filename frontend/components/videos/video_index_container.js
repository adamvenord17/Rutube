import { connect } from 'react-redux';
import VideoIndex from './video_index';
import { fetchVideos } from '../../actions/video_actions';

const mSTP = state => {
    return {
        videos: state.entities.videos,
    };
};

const mDTP = dispatch => {
    return({
        fetchVideos: () => dispatch(fetchVideos())
    });
};

export default connect(mSTP, mDTP)(VideoIndex);