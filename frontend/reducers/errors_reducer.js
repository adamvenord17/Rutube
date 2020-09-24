import { combineReducers } from "redux";
import sessionErrorsReducer from "./session_errors_reducer";
import videoErrorsReducer from "./video_errors_reducer";

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    videos: videoErrorsReducer
});

export default errorsReducer;