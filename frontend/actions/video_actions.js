import * as ApiVideosUtil from '../util/video_api_util';

export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const RECEIVE_VIDEO = "RECEIVE_VIDEO";

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

export const fetchVideos = () => dispatch => {
    return (ApiVideosUtil.fetchVideos().then(videos => dispatch(receiveVideos(videos))));
};

export const fetchVideo = (videoId) => dispatch => {
    return (ApiVideosUtil.fetchVideo(videoId).then(video => dispatch(receiveVideo(video))));
};

export const uploadVideo = (video) => dispatch => {
    return (ApiVideosUtil.createVideo(video).then(video => dispatch(receiveVideo(video.id))));
};

export const removeVideo = () => dispatch => {
    return (ApiVideosUtil.deleteVideo().then(videos => dispatch(receiveVideos(videos))));
};
