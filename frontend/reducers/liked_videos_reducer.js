import { RECEIVE_LIKED_VIDEOS, CLEAR_LIKED_VIDEOS } from '../actions/video_actions';

const likedVideosReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type) {
        case RECEIVE_LIKED_VIDEOS:
            return action.videos;
        case CLEAR_LIKED_VIDEOS:
            return {};
        default:
            return oldState;
    }
};

export default likedVideosReducer;