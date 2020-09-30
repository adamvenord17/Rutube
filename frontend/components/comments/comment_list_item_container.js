import { connect } from "react-redux"
import { deleteComment, updateComment } from "../../actions/comment_actions";
import { fetchUser } from "../../actions/user_actions";
import CommentListItem from "./comment_list_item";

const mSTP = (state, ownProps) => {
    // debugger
    return ({
        author: state.entities.users[ownProps.comment.authorId],
        comment: ownProps.comment,
        currentUserId: state.session.currentUserId
    });
};

const mDTP = dispatch => {
    return ({
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
        updateComment: (comment) => dispatch(updateComment(comment)),
        fetchUser: (userId) => dispatch(fetchUser(userId))
    });
};

export default connect(mSTP, mDTP)(CommentListItem);