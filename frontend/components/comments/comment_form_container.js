import { connect } from 'react-redux';
import { createComment } from "../../actions/comment_actions";
import CommentsForm from "./comment_form";
import { withRouter } from 'react-router-dom'

const mSTP = (state, ownProps) => {
    return ({
        videoId: ownProps.videoId,
        parentId: ownProps.parentId,
        currentUser: state.entities.users[state.session.currentUserId],
        formType: "CREATE",
    });
};

const mDTP = dispatch => {
    return ({
        createComment: (videoId, comment) => dispatch(createComment(videoId, comment)),
        createReply: (parentId, comment) => dispatch(createReply(parentId, comment))
    });
};

export default withRouter(connect(mSTP, mDTP)(CommentsForm));