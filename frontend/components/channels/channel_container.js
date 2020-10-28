import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Channel from "./channel";
import { fetchUser } from "../../actions/user_actions";
import { subscribeTo, unsubscribeTo } from '../../actions/user_actions';

const mSTP = (state, ownProps) => {
    return({
        users: state.entities.users,
        channelOwner: state.entities.users[ownProps.match.params.userId],
        channelOwnerId: ownProps.match.params.userId,
        currentUserId: state.session.currentUserId
    })
}

const mDTP = dispatch => {
    return({
        fetchUser: userId => dispatch(fetchUser(userId)),
        subscribeTo: (creatorId, subscriberId) => dispatch(subscribeTo(creatorId, subscriberId)),
        unsubscribeTo: (creatorId, subscriberId) => dispatch(unsubscribeTo(creatorId, subscriberId)),
    })
}

export default withRouter(connect(mSTP, mDTP)(Channel))

