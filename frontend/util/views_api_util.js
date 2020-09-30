export const addView = (videoId) => {
    return(
        $.ajax({
            method: "POST",
            url: `/api/videos/${videoId}/addview`
        })
    );
};