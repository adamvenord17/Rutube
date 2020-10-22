import * as ApiCommentsUtil from "../util/comment_api_util";
import * as ApiLikesUtil from '../util/likes_util';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENTS";
export const RECEIVE_REPLY = "RECEIVE_REPLY";
export const REMOVE_REPLY = "REMOVE_REPLY";


const receiveComments = (comments) => {
    return({
        type: RECEIVE_COMMENTS,
        comments
    });
};

const receiveComment = (comment) => {
    return({
        type: RECEIVE_COMMENT,
        comment
    });
};

const removeComment = (commentId) => {
    return({
        type: REMOVE_COMMENT,
        commentId
    });
};

const removeReply = (reply) => {
    return({
        type: REMOVE_REPLY,
        reply
    });
};

const receiveReply = (reply) => {
    return({
        type: RECEIVE_REPLY,
        reply
    });
};

export const fetchComments = (videoId) => dispatch => {
    return(ApiCommentsUtil.fetchComments(videoId).then(comments => dispatch(receiveComments(comments))));
};

export const createComment = (videoId, comment) => dispatch => {
    return(ApiCommentsUtil.createComment(videoId, comment).then(comment => dispatch(receiveComment(comment))));
};

export const updateComment = (comment) => dispatch => {
    return(ApiCommentsUtil.updateComment(comment).then(comment => dispatch(receiveComment(comment))));
};

export const deleteComment = (commentId) => dispatch => {
    return(ApiCommentsUtil.deleteComment(commentId).then(dispatch(removeComment(commentId))));
};

export const createReply = (commentId, comment) => dispatch => {
    return (ApiCommentsUtil.createReply(commentId, comment).then(comment => dispatch(receiveReply(comment))));
};

export const deleteReply = (reply) => dispatch => {
    return (ApiCommentsUtil.deleteComment(reply.id).then(dispatch(removeReply(reply))));
};

// below actions are for liking/disliking comments

export const likeComment = (commentId) => dispatch => {
    return (ApiLikesUtil.likeComment(commentId).then(comment => dispatch(receiveComment(comment))));
};
export const unlikeComment = (commentId) => dispatch => {
    return (ApiLikesUtil.unlikeComment(commentId).then(comment => dispatch(receiveComment(comment))));
};
export const dislikeComment = (commentId) => dispatch => {
    return (ApiLikesUtil.dislikeComment(commentId).then(comment => dispatch(receiveComment(comment))));
};
export const undislikeComment = (commentId) => dispatch => {
    return (ApiLikesUtil.undislikeComment(commentId).then(comment => dispatch(receiveComment(comment))));
};
export const changeLikeComment = (commentId) => dispatch => {
    return (ApiLikesUtil.changeLikeComment(commentId).then(comment => dispatch(receiveComment(comment))));
};

