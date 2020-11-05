export const fetchVideos = (data) => {
    debugger
    return(
        $.ajax({
            method: "GET",
            url: "api/videos",
            data
        })
    );
};

export const fetchVideo = (videoId) => {
    debugger
    return(
        $.ajax({
            method: "GET",
            url: `api/videos/${videoId}`
        })
    );
};

export const createVideo = (video) => {
    debugger
    return (
        $.ajax({
            method: "POST",
            url: `api/videos`,
            data: video,
            contentType: false,
            processData: false
        })
    );
};

export const updateVideo = (video, tags) => {
    debugger
    return (
        $.ajax({
            method: "PATCH",
            url: `api/videos/${video.id}`,
            data: { video, tags }
        })
    );
};

export const deleteVideo = (videoId) => {
    debugger
    return (
        $.ajax({
            method: "DELETE",
            url: `api/videos/${videoId}`
        })
    );
};