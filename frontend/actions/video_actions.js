import * as ApiVideosUtil from '../util/video_api_util';

export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const RECEIVE_VIDEO_ERRORS = "RECEIVE_VIDEO_ERRORS";

const receiveVideos = (videos) => {
    return {
        type: RECEIVE_VIDEOS,
        videos
    };
};

const receiveVideo = (video) => {
    return {
        type: RECEIVE_VIDEO,
        video
    };
};

const receiveVideoErrors = errors => {
    return ({
        type: RECEIVE_VIDEO_ERRORS,
        errors
    });
};

export const fetchVideos = () => dispatch => {
    return (ApiVideosUtil.fetchVideos().then(videos => dispatch(receiveVideos(videos)), errors => dispatch(receiveVideoErrors(errors))));
};

export const fetchVideo = (videoId) => dispatch => {
    return (ApiVideosUtil.fetchVideo(videoId).then(video => dispatch(receiveVideo(video)), errors => dispatch(receiveVideoErrors(errors))));
};

export const uploadVideo = (video) => dispatch => {
    return (ApiVideosUtil.createVideo(video).then(video => dispatch(receiveVideo(video.id)), errors => dispatch(receiveVideoErrors(errors))));
};

export const removeVideo = () => dispatch => {
    return (ApiVideosUtil.deleteVideo().then(videos => dispatch(receiveVideos(videos))));
};
