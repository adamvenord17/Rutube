import { RECEIVE_VIDEOS, RECEIVE_VIDEO } from '../actions/video_actions';

const videosReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type) {
        case RECEIVE_VIDEOS:
            return action.videos;
        case RECEIVE_VIDEO:
            return action.video;
        default:
            return oldState;
    }
};

export default videosReducer;