import { combineReducers } from 'redux';
import usersReducer from "./users_reducer";
import videosReducer from "./videos_reducer";
import commentsReducer from "./comments_reducer";
import tagsReducer from "./tags_reducer";
import likedVideosReducer from "./liked_videos_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    videos: videosReducer,
    comments: commentsReducer,
    tags: tagsReducer,
    likedVideos: likedVideosReducer
});

export default entitiesReducer;