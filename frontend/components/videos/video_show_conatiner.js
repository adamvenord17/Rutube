import { connect } from "react-redux";
import VideoShow from './video_show';
import { fetchVideos, removeVideo } from "../../actions/video_actions"; 
import { fetchUser } from "../../actions/user_actions";
import { openModal } from "../../actions/modal_actions";
import { withRouter } from 'react-router-dom';

const mSTP = (state, ownProps) => {
    // debugger
    return {
        currentVideo: state.entities.videos[ownProps.match.params.videoId],
        videos: state.entities.videos,
        users: state.entities.users,
        currentUserId: state.session.currentUserId
    };
};

const mDTP = dispatch => {
    return {
        fetchVideos: () => dispatch(fetchVideos()),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        openModalSidebar: () => dispatch(openModal('sidebar')),
        openModalEdit: () => dispatch(openModal('edit')),
        removeVideo: (videoId) => dispatch(removeVideo(videoId))
    };
};


export default withRouter(connect(mSTP, mDTP)(VideoShow));
