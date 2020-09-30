import * as ApiVideosUtil from '../util/video_api_util';
import * as ApiLikesUtil from '../util/likes_util';

export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const RECEIVE_VIDEO_ERRORS = "RECEIVE_VIDEO_ERRORS";
export const REMOVE_VIDEO = "REMOVE_VIDEO";

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

const deleteVideo = (videoId) => {
    return {
        type: REMOVE_VIDEO,
        videoId
    };
};

export const fetchVideos = (filters) => dispatch => {
    return (ApiVideosUtil.fetchVideos(filters).then(videos => dispatch(receiveVideos(videos)), errors => dispatch(receiveVideoErrors(errors))));
};

export const fetchVideo = (videoId) => dispatch => {
    return (ApiVideosUtil.fetchVideo(videoId).then(video => dispatch(receiveVideo(video)), errors => dispatch(receiveVideoErrors(errors))));
};

export const uploadVideo = (video) => dispatch => {
    return (ApiVideosUtil.createVideo(video).then(video => dispatch(receiveVideo(video)), errors => dispatch(receiveVideoErrors(errors))));
};

export const removeVideo = (videoId) => dispatch => {
    return (ApiVideosUtil.deleteVideo(videoId).then(dispatch(deleteVideo(videoId)), errors => dispatch(receiveVideoErrors(errors))));
};

export const updateVideo = (video) => dispatch => {
    return (ApiVideosUtil.updateVideo(video).then(video => dispatch(receiveVideo(video)), errors => dispatch(receiveVideoErrors(errors))));
};

// below actions are for likes

export const likeVideo = (videoId) => {
    return (ApiLikesUtil.likeVideo(videoId).then(video => dispatch(receiveVideo(video))));
};
export const unlikeVideo = (videoId) => {
    return (ApiLikesUtil.unlikeVideo(videoId).then(video => dispatch(receiveVideo(video))));
};
export const dislikeVideo = (videoId) => {
    return (ApiLikesUtil.dislikeVideo(videoId).then(video => dispatch(receiveVideo(video))));
};
export const undislikeVideo = (videoId) => {
    return (ApiLikesUtil.undislikeVideo(videoId).then(video => dispatch(receiveVideo(video))));
};
export const changeLikeVideo = (videoId) => {
    return (ApiLikesUtil.changeLikeVideo(videoId).then(video => dispatch(receiveVideo(video))));
};

