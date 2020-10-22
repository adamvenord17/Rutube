import { connect } from "react-redux"
import { deleteComment, deleteReply, updateComment } from "../../actions/comment_actions";
import { fetchUser } from "../../actions/user_actions";
import CommentListItem from "./comment_list_item";
import { likeComment, unlikeComment, dislikeComment, undislikeComment, changeLikeComment } from '../../actions/comment_actions';
import { withRouter } from "react-router-dom";

const mSTP = (state, ownProps) => {
    return ({
        author: state.entities.users[ownProps.comment.authorId],
        comment: ownProps.comment,
        currentUserId: state.session.currentUserId,
        comments: state.entities.comments
    });
};

const mDTP = dispatch => {
    return ({
        deleteReply: (replyId) => dispatch(deleteReply(replyId)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
        updateComment: (comment) => dispatch(updateComment(comment)),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        likeComment: (commentId) => dispatch(likeComment(commentId)),
        unlikeComment: (commentId) => dispatch(unlikeComment(commentId)),
        dislikeComment: (commentId) => dispatch(dislikeComment(commentId)),
        undislikeComment: (commentId) => dispatch(undislikeComment(commentId)),
        changeLikeComment: (commentId) => dispatch(changeLikeComment(commentId))
    });
};

export default withRouter(connect(mSTP, mDTP)(CommentListItem));