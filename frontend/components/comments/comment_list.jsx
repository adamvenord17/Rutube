import React from 'react';
import CommentFormContainer from './comment_form_container';
import CommentListItemContainer from './comment_list_item_container';

class CommentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoId: this.props.video.id,
            sortByNew: true
        };

        this.handleSortBy = this.handleSortBy.bind(this);
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

    handleSortBy() {
        this.state.sortByNew ? this.setState({sortByNew: false}) : this.setState({sortByNew: true})
    }
    
    render() {

        // sets up the comment number count dislpayed in the comment's secion header
        let commentCount = '';
        if (Object.values(this.props.comments).length === 0) {
            commentCount = <p>No comments yet</p>
        } else if (Object.values(this.props.comments).length === 1) {
            commentCount = <p>{Object.values(this.props.comments).length} Comment</p>
        } else {
            commentCount = <p>{Object.values(this.props.comments).length} Comments</p>
        }

        // set up all the comments associated with the video, sort by old or new
        let comments = Object.values(this.props.comments)
        let sortByP = 'SORTED BY: Oldest';
        
        if (this.state.sortByNew) {
            comments = Object.values(this.props.comments).reverse();
            sortByP = 'SORTED BY: Newest';
        }

        comments = comments.map(comment => {
            if (comment.parentId === null) {
                return <CommentListItemContainer key={comment.id} comment={comment} />
            }
        })


        return(
            <div id="comment-list-container">
                <header id="comments-list-header">
                    {commentCount}
                    <div onClick={this.handleSortBy}>
                        <i className="fas fa-sort-amount-up"></i>
                        <p>{sortByP}</p>
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