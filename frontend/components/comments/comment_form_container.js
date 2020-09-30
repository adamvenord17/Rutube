import { connect } from 'react-redux';
import { createComment } from "../../actions/comment_actions";
import CommentsForm from "./comment_form";
import { withRouter } from 'react-router-dom'

const mSTP = (state, ownProps) => {
    return ({
        videoId: ownProps.videoId,
        currentUser: state.entities.users[state.session.currentUserId],
        formType: "CREATE",
    });
};

const mDTP = dispatch => {
    return ({
        createComment: (videoId, comment) => dispatch(createComment(videoId, comment))
    });
};

export default withRouter(connect(mSTP, mDTP)(CommentsForm));