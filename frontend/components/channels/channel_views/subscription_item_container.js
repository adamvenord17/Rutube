import { connect } from "react-redux"
import { withRouter } from "react-router-dom";
import { fetchUser, unsubscribeTo } from "../../../actions/user_actions";
import SubscriptionItem from './subscription_item';

const mSTP = (state, ownProps) => {
    return({
        creatorId: ownProps.creatorId,
        creator: state.entities.users[ownProps.creatorId]
    })
}

const mDTP = dispatch => {
    return({
        unsubscribeTo: userId => dispatch(unsubscribeTo(userId)),
        fetchUser: userId => dispatch(fetchUser(userId)),
    })
}

export default withRouter(connect(mSTP, mDTP)(SubscriptionItem))