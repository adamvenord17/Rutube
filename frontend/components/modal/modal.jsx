import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';


import SidebarContainer from "../side_bar/side_bar_container";
import UploadVideoFormContainer from "../videos/video_form/upload_video_form_container";
import EditVideoFormContainer from "../videos/video_form/edit_video_form_container";


function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let component;
    switch (modal) {
        case 'upload':
            component = <UploadVideoFormContainer />;
            break;
        case 'sidebar':
            component = <SidebarContainer/>;
            break;
        case 'edit':
            component = <EditVideoFormContainer />;
            break;
        default:
            return null;
    }

    if (modal === 'sidebar') {
        return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child sidebar" onClick={e => e.stopPropagation()}>
                { component }
            </div>
        </div>
    );
    } else {
        return (
            <div className="modal-background" onClick={closeModal}>
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    { component }
                </div>
            </div>
        );
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);