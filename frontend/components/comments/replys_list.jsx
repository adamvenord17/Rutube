import React from 'react';
import CommentListItemContainer from './comment_list_item_container';

class ReplysList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleCloseReplies = this.handleCloseReplies.bind(this);
        this.handleOpenReplies = this.handleOpenReplies.bind(this);
    }

    handleCloseReplies() {
        this.setState({open: false});
    }

    handleOpenReplies() {
        this.setState({open: true});
    }

    render() {

        let replies = [];
        Object.values(this.props.comments).map(comment => {
            if (this.props.parent.replyIds.includes(comment.id)) {
                replies.push(<CommentListItemContainer key={comment.id} comment={comment} />)
            }
        });
        // debugger
        if (replies.length > 0) {

            let repliesBtnText = ''
            if (replies.length === 1) {
                repliesBtnText = 'View 1 reply';
            } else if (replies.length > 1) {
                repliesBtnText = `View ${replies.length} replys`;
            }

            let repliesDropdownBtn = '';
            if (this.state.open) {
                repliesDropdownBtn = <button type="button" onClick={this.handleCloseReplies} ><i className="fas fa-caret-up"></i> {repliesBtnText} </button>
            } else {
                repliesDropdownBtn = <button type="button" onClick={this.handleOpenReplies} ><i className="fas fa-sort-down"></i> {repliesBtnText} </button>
            }

            let replyList = '';
            let replyListId = `reply-list-${this.props.parent.id}`
            if (this.state.open) {
                replyList = <div id={replyListId} className="reply-list-class">
                                {replies}
                            </div>
            }
            return(
                <div id="reply-list-container">
                    {repliesDropdownBtn}
                    {replyList}
                </div>
            )
        } else {
            return null
        }
    }
}

export default ReplysList;