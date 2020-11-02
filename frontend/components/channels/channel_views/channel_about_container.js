import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ChannelAbout from './channel_about';
import {updateUser} from '../../../actions/user_actions';

const mSTP = (state, ownProps) => {
    return({
        users: state.entities.users,
        channelOwner: state.entities.users[ownProps.match.params.userId],
        channelOwnerId: ownProps.match.params.userId,
        currentUserId: state.session.currentUserId,
        videos: state.entities.videos,
        errors: state.errors.session
    })
}

const mDTP = dispatch => {
    return({
        updateUser: user => dispatch(updateUser(user))
    })
}

export default withRouter(connect(mSTP, mDTP)(ChannelAbout))