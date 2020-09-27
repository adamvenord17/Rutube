import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import { uploadVideo } from "../../../actions/video_actions";
import UploadVideoForm from "./upload_video_form";

const mSTP = ({ errors }) => {
    return {
        errors: errors.videos,
        formType: "UPLOAD"
    };
};

const mDTP = dispatch => {
    return {
        processForm: (video) => dispatch(uploadVideo(video)),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mSTP, mDTP)(UploadVideoForm);