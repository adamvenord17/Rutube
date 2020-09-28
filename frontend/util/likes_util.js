export const likeVideo = (videoId) => {
    $.ajax({
        method: "POST",
        url: `api/videos/${videoId}/like`
    });
};

export const unlikeVideo = (videoId) => {
    $.ajax({
        method: "POST",
        url: `api/videos/${videoId}/unlike`
    });
};

export const dislikeVideo = (videoId) => {
    $.ajax({
        method: "POST",
        url: `api/videos/${videoId}/dislike`
    });
};

export const undislikeVideo = (videoId) => {
    $.ajax({
        method: "POST",
        url: `api/videos/${videoId}/undislike`
    });
};

export const changelikeVideo = (videoId) => {
    $.ajax({
        method: "PATCH",
        url: `api/videos/${videoId}/changelike`
    });
};