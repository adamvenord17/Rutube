import { RECEIVE_VIDEOS, RECEIVE_VIDEO, REMOVE_VIDEO } from '../actions/video_actions';

const videosReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState)
    switch(action.type) {
        case RECEIVE_VIDEOS:
            return action.videos;
        case RECEIVE_VIDEO:
            newState[action.video.id] = action.video;
            return newState;
        case REMOVE_VIDEO:
            delete newState[action.videoId];
            return newState;
        default:
            return oldState;
    }
};

export default videosReducer;