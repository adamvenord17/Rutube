import React from 'react';
import CommentFormContainer from './comment_form_container';
import CommentListItemContainer from './comment_list_item_container';

class CommentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoId: this.props.video.id
        };
    }

    componentDidMount() {
        this.props.fetchComments(this.props.video.id);
    }

    componentDidUpdate() {
        if (this.state.videoId !== this.props.video.id) {
            this.handleVideoChange();
        }
    }
    
    handleVideoChange() {
        this.props.fetchComments(this.props.video.id);
        this.setState({videoId: this.props.video.id});
    }
    
    render() {
        // debugger

        // sets up the comment number count dislpayed in the comment's secion header
        let commentCount = '';
        if (Object.values(this.props.comments).length === 0) {
            commentCount = <p>No comments yet</p>
        } else if (Object.values(this.props.comments).length === 1) {
            commentCount = <p>{Object.values(this.props.comments).length} Comment</p>
        } else {
            commentCount = <p>{Object.values(this.props.comments).length} Comments</p>
        }

        // set up all the comments associated with the video
        let comments = Object.values(this.props.comments).map(comment => {
            return <CommentListItemContainer key={comment.id} comment={comment} />
        })


        return(
            <div id="comment-list-container">
                <header id="comments-list-header">
                    {commentCount}
                    <div>
                        <i className="fas fa-sort-amount-up"></i>
                        <p>SORT BY</p>
                    </div>
                </header>
                <CommentFormContainer videoId={this.props.video.id} />
                <div id="comment-list-items-container">
                    {comments}
                </div>
            </div>
        )
    }
}

export default CommentList;