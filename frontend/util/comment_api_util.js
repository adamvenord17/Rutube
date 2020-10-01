export const fetchComments = (videoId) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/videos/${videoId}/comments`
        })
    );
};

export const createComment = (videoId, comment) => {
    return (
        $.ajax({
            method: "POST",
            url: `api/videos/${videoId}/comments`,
            data: { comment }
        })
    );
};

export const deleteComment = (commentId) => {
    return (
        $.ajax({
            method: "DELETE",
            url: `api/comments/${commentId}`
        })
    );
};

export const updateComment = (comment) => {
    return (
        $.ajax({
            method: "PATCH",
            url: `api/comments/${comment.id}`,
            data: { comment }
        })
    );
};

// the below are methods for reply comments

export const fetchReplys = (commentId) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/comments/${commentId}/comments`
        })
    );
};

export const createReply = (commentId, comment) => {
    return (
        $.ajax({
            method: "POST",
            url: `api/comments/${commentId}/comments`,
            data: { comment }
        })
    );
};