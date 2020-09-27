import { connect } from "react-redux";
import VideoShow from './video_show';
import { fetchVideos } from "../../actions/video_actions"; 
import { fetchUser } from "../../actions/user_actions";
import { openModal } from "../../actions/modal_actions";

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
        openModal: () => dispatch(openModal('sidebar')),
    };
};


export default connect(mSTP, mDTP)(VideoShow);
