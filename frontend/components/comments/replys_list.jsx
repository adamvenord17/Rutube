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

    componentDidMount() {
        this.handleCloseReplies();
    }

    handleCloseReplies() {
        this.setState({open: false});
    }

    handleOpenReplies() {
        this.setState({open: true});
    }

    render() {

        let comments = Object.values(this.props.comments).reverse();
        let replies = [];
        comments.map(comment => {
            if (this.props.parent.replyIds.includes(comment.id)) {
                replies.push(<CommentListItemContainer key={comment.id} comment={comment} />)
            }
        });

        if (replies.length >= 0) {

            let repliesBtnText = ''
            if (replies.length === 0) {
                repliesBtnText = ''
            } else if (replies.length === 1) {
                repliesBtnText = '1 reply';
            } else if (replies.length > 1) {
                repliesBtnText = `${replies.length} replys`;
            }

            let repliesDropdownBtn = '';
            if (this.state.open) {
                repliesDropdownBtn = <button type="button" onClick={this.handleCloseReplies} ><i className="fas fa-caret-up"></i> Hide {repliesBtnText} </button>
            } else {
                repliesDropdownBtn = <button type="button" onClick={this.handleOpenReplies} ><i className="fas fa-sort-down"></i> View {repliesBtnText} </button>
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