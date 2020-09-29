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