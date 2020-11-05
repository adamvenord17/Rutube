import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelHome from './channel_home';
import { fetchVideos } from '../../../actions/video_actions';

const mSTP = (state, ownProps) => {
    return({
        users: state.entities.users,
        channelOwner: state.entities.users[ownProps.match.params.userId],
        channelOwnerId: ownProps.match.params.userId,
        currentUserId: state.entities.currentUserId,
        videos: state.entities.videos,
    })
}

const mDTP = dispatch => {
    return({
        fetchUserVideos: userId => dispatch(fetchVideos(userId)),
    })
}

export default withRouter(connect(mSTP, mDTP)(ChannelHome))