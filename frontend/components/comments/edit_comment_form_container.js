import { connect } from 'react-redux';
import { updateComment } from "../../actions/comment_actions";
import CommentsForm from "./comment_form";
import { withRouter } from 'react-router-dom';

const mSTP = (state, ownProps) => {
    return ({
        comment: ownProps.comment,
        formType: "EDIT",
    });
};

const mDTP = dispatch => {
    return ({
        updateComment: (comment) => dispatch(updateComment(comment))
    });
};

export default withRouter(connect(mSTP, mDTP)(CommentsForm));