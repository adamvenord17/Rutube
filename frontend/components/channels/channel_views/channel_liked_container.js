import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LikedVideos from './liked_videos';
import { fetchLikedVideos } from "../../../actions/video_actions";

const mSTP = (state, ownProps) => {
    return({
        users: state.entities.users,
        channelOwner: state.entities.users[ownProps.match.params.userId],
        channelOwnerId: ownProps.match.params.userId,
        currentUserId: state.entities.currentUserId,
        videos: state.entities.likedVideos
    })
}

const mDTP = dispatch => {
    return({
        fetchLikedVideos: userId => dispatch(fetchLikedVideos(userId)),
    })
}

export default withRouter(connect(mSTP,mDTP)(LikedVideos))