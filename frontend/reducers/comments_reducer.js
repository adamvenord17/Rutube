import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from "../actions/comment_actions";


const commentsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        case RECEIVE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        case REMOVE_COMMENT:
            delete newState[action.commentId];
            return newState;
        default:
            return oldState;
    }
};

export default commentsReducer;