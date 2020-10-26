import * as ApiTagsUtil from "../util/tag_api_util";

export const RECEIVE_TAGS = "RECEIVE_TAGS";
export const RECEIVE_TAG = "RECEIVE_TAG";

const receiveTags = (tags) => {
    return({
        type: RECEIVE_TAGS,
        tags
    })
}

const receiveTag = (tag) => {
    return({
        type: RECEIVE_TAG,
        tag
    })
}

export const fetchTags = () => dispatch => {
    return(ApiTagsUtil.fetchTags().then(tags => dispatch(receiveTags(tags)).catch(errors => console.log(errors))))
}

export const fetchTag = (tag_id) => dispatch => {
    return(ApiTagsUtil.fetchTag(tag_id).then(tag => dispatch(receiveTag(tag))))
}
