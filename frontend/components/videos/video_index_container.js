import { connect } from 'react-redux';
import VideoIndex from './video_index';
import { fetchVideos } from '../../actions/video_actions';
import { fetchTags } from  '../../actions/tag_actions';

const mSTP = state => {
    return {
        videos: state.entities.videos,
        tags: state.entities.tags
    };
};

const mDTP = dispatch => {
    return({
        fetchVideos: () => dispatch(fetchVideos()),
        fetchTags: () => dispatch(fetchTags())
    });
};

export default connect(mSTP, mDTP)(VideoIndex);