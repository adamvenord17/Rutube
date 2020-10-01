import { connect } from 'react-redux';
import ReplysList from './replys_list';

const mSTP = (state, ownProps) => {
    return({
        comments: state.entities.comments,
        parent: ownProps.parent
    });
};

export default connect(mSTP)(ReplysList);