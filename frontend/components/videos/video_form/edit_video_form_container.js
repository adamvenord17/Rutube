import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import { updateVideo } from "../../../actions/video_actions";
import UploadVideoForm from "./upload_video_form";
import { withRouter } from 'react-router-dom'

const mSTP = (state, ownProps) => {
    return {
        errors: state.errors.videos,
        videos: state.entities.videos,
        formType: "EDIT"
    };
};

const mDTP = dispatch => {
    return {
        processForm: (video, tags) => dispatch(updateVideo(video, tags)),
        closeModal: () => dispatch(closeModal())
    };
};

export default withRouter(connect(mSTP, mDTP)(UploadVideoForm));