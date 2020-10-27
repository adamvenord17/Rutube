import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT, RECEIVE_REPLY, REMOVE_REPLY } from "../actions/comment_actions";


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
        case RECEIVE_REPLY:
            newState[action.reply.parentId].replyIds.push(action.reply.id);
            newState[action.reply.id] = action.reply;
            return newState;
        case REMOVE_REPLY:
            newState[action.reply.parentId].replyIds = newState[action.reply.parentId].replyIds.filter(ele => ele !== action.reply.id);
            delete newState[action.reply.id];
            return newState;
        default:
            return oldState;
    }
};

export default commentsReducer;