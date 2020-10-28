import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelVideos from './channel_videos';

const mSTP = (state, ownProps) => {
    return({
        users: state.entities.users,
        channelOwner: state.entities.users[ownProps.match.params.userId],
        channelOwnerId: ownProps.match.params.userId,
        currentUserId: state.entities.currentUserId
    })
}

// const mDTP = dispatch => {
//     return({

//     })
// }

export default withRouter(connect(mSTP)(ChannelVideos))