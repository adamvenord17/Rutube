// below are for videos

export const likeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/like`
    }));
};

export const unlikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/unlike`
    }));
};

export const dislikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/dislike`
    }));
};

export const undislikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/undislike`
    }));
};

export const changeLikeVideo = (videoId) => {
    return ($.ajax({
        method: "POST",
        url: `api/videos/${videoId}/changelike`
    }));
};

// below are for comments

export const likeComment = (commentId) => {
    return ($.ajax({
        method: "POST",
        url: `api/comments/${commentId}/like`
    }));
};

export const unlikeComment = (commentId) => {
    return ($.ajax({
        method: "POST",
        url: `api/comments/${commentId}/unlike`
    }));
};

export const dislikeComment = (commentId) => {
    return ($.ajax({
        method: "POST",
        url: `api/comments/${commentId}/dislike`
    }));
};

export const undislikeComment = (commentId) => {
    return ($.ajax({
        method: "POST",
        url: `api/comments/${commentId}/undislike`
    }));
};

export const changeLikeComment = (commentId) => {
    return ($.ajax({
        method: "POST",
        url: `api/comments/${commentId}/changelike`
    }));
};