import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Channel from "./channel";
import { fetchUser } from "../../actions/user_actions";

const mSTP = (state, ownProps) => {
    return({
        channelOwner: state.entities.users[ownProps.match.params.userId],
        channelOwnerId: ownProps.match.params.userId
    })
}

const mDTP = dispatch => {
    return({
        fetchUser: userId => dispatch(fetchUser(userId))
    })
}

export default withRouter(connect(mSTP, mDTP)(Channel))

