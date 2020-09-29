import { connect } from "react-redux"
import { deleteComment, fetchComments } from "../../actions/comment_actions";
import CommentsList from "./comment_list";

const mSTP = (state, ownProps) => {
    return({
        video: ownProps.video,
        users: state.entities.users,
        comments: state.entities.comments
    });
};

const mDTP = dispatch => {
    return({
        fetchComments: (videoId) => dispatch(fetchComments(videoId)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId))
    });
};

export default connect(mSTP, mDTP)(CommentsList);



