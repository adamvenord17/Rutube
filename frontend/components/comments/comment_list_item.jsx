import React from "react";
import { timeSinceUpload } from "../../util/format_util";
import { Link } from "react-router-dom";
import EditCommentFormContainer from "./edit_comment_form_container";
import CommentFormContainer from "./comment_form_container";
import ReplysListContainer from "./replys_list_container";


class CommentListItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            replyCount: 0,
        };

        this.handlePopup = this.handlePopup.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

        this.handleRedirectToLogin = this.handleRedirectToLogin.bind(this);
        this.handleLikeComment = this.handleLikeComment.bind(this);
        this.handleUnlikeComment = this.handleUnlikeComment.bind(this);
        this.handleDislikeComment = this.handleDislikeComment.bind(this);
        this.handleUndislikeComment = this.handleUndislikeComment.bind(this);
        this.handleChangeLikeComment = this.handleChangeLikeComment.bind(this);
        this.handleLikeChange = this.handleLikeChange.bind(this);
        this.handleOpenReplyForm = this.handleOpenReplyForm.bind(this);

        this.handleUpdateAfterReply = this.handleUpdateAfterReply.bind(this);
    }

    componentDidMount() {
        if (!this.props.author) {
            this.props.fetchUser(this.props.comment.authorId);
        }

        this.handlePopup = this.handlePopup.bind(this);

        if (document.getElementById(`comment-like-btn-${this.props.comment.id}`) && document.getElementById(`comment-dislike-btn-${this.props.comment.id}`)) {
            this.handleLikeChange();
        }
    }

    componentDidUpdate() {
        if (document.getElementsByClassName("inline-comment-form-container")[0]) {
            if (document.getElementsByClassName("inline-comment-form-input")[0].value.length > 0) {
                if (!document.getElementsByClassName("inline-comment-form-btns-container")[0]) {
                    this.setState({editMode: false});
                }
            }
        }

        if (document.getElementById(`comment-like-btn-${this.props.comment.id}`) && document.getElementById(`comment-dislike-btn-${this.props.comment.id}`)) {
            this.handleLikeChange();
        }

    }

    handleUpdateAfterReply() {
        this.setState({editMode: false});
    }

    handleLikeChange() {
        let likeBtn = document.getElementById(`comment-like-btn-${this.props.comment.id}`);
        let dislikeBtn = document.getElementById(`comment-dislike-btn-${this.props.comment.id}`);
        if (this.props.comment.likerIds.includes(this.props.currentUserId)) {
            likeBtn.classList.add("like-selected");
            dislikeBtn.classList.remove("like-selected");
        } else if (this.props.comment.dislikerIds.includes(this.props.currentUserId)) {
            likeBtn.classList.remove("like-selected");
            dislikeBtn.classList.add("like-selected");
        } else {
            likeBtn.classList.remove("like-selected");
            dislikeBtn.classList.remove("like-selected");
        }
    }

    handleLikeComment() {
        this.props.likeComment(this.props.comment.id);
    }

    handleUnlikeComment() {
        this.props.unlikeComment(this.props.comment.id);
    }

    handleDislikeComment() {
        this.props.dislikeComment(this.props.comment.id);
    }

    handleUndislikeComment() {
        this.props.undislikeComment(this.props.comment.id);
    }

    handleChangeLikeComment() {
        this.props.changeLikeComment(this.props.comment.id);
    }

    handleRedirectToLogin() {
        this.props.history.push('/login');
    }

    hashCode(str) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    intToRGB(i) {
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
    }

    handlePopup() {
        let popup = document.getElementById(`comment-options-popup${this.props.comment.id}`);
        popup.classList.remove("hide");
        let body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", () => {
            popup.classList.add("hide");
        });
    }

    handleDelete() {
        if (this.props.comment.parentId) {
            this.props.deleteReply(this.props.comment)
        } else {
            this.props.deleteComment(this.props.comment.id);
        }
    }

    handleEdit() {
        this.setState({editMode: true});
    }

    handleOpenReplyForm() {
        document.getElementById(`reply-comment-form-${this.props.comment.id}`).classList.add("show");
    }

    render() {
        if (!this.props.author) {
            return null
        } else {
            // set up user icon color
            let iconColor = this.intToRGB(this.hashCode(this.props.author.username));
            let iconStyle = {
                backgroundColor: `#${iconColor}`
            };

            // set up comment options dropdown if current user is author of comment
            // allows user to delete comment (and edit in the future)
            let commentPopup = ''
            let idTag = `comment-options-popup${this.props.comment.id}`;
            if (this.props.currentUserId === this.props.author.id) {
                commentPopup = <div id={idTag} className="comment-options-popup hide">
                                    <button onClick={this.handleEdit}><i className="fas fa-pencil-alt"></i><span>Edit</span></button>
                                    <button onClick={this.handleDelete}><i className="fas fa-trash"></i><span>Delete</span></button>
                                </div>
            } else {
                commentPopup = <div id={idTag} className="comment-options-popup hide">
                                    <button><i className="fas fa-flag"></i><span>Report</span></button>
                                </div>
            }

            // checks if comment is edited, if yes, gives edited tag next to username
            let editedTag = '';
            if (this.props.comment.isEdited) {
                editedTag = <span>(edited)</span>
            }

            // sets up the like buttons and their actions based on the users current
            // status of having diliked/liked the comment already
            // if no current user, both buttons should redirect to the signin page
            let likeBtn = ''
            let dislikeBtn = ''
            let likeBtnId = `comment-like-btn-${this.props.comment.id}`
            let dislikeBtnId = `comment-dislike-btn-${this.props.comment.id}`
            if (!this.props.currentUserId) {
                likeBtn = <button onClick={this.handleRedirectToLogin} className="comment-like-btn-class" id={likeBtnId}><i className="fas fa-thumbs-up"></i><span>{this.props.comment.likerIds.length}</span></button>
                dislikeBtn = <button onClick={this.handleRedirectToLogin} className="comment-dislike-btn-class" id={dislikeBtnId}><i className="fas fa-thumbs-down"></i></button>
            } else if (this.props.comment.likerIds.includes(this.props.currentUserId)) {
                likeBtn = <button onClick={this.handleUnlikeComment} className="comment-like-btn-class" id={likeBtnId}><i className="fas fa-thumbs-up"></i><span>{this.props.comment.likerIds.length}</span></button>
                dislikeBtn = <button onClick={this.handleChangeLikeComment} className="comment-dislike-btn-class" id={dislikeBtnId}><i className="fas fa-thumbs-down"></i></button>
            } else if (this.props.comment.dislikerIds.includes(this.props.currentUserId)) {
                likeBtn = <button onClick={this.handleChangeLikeComment} className="comment-like-btn-class" id={likeBtnId}><i className="fas fa-thumbs-up"></i><span>{this.props.comment.likerIds.length}</span></button>
                dislikeBtn = <button onClick={this.handleUndislikeComment} className="comment-dislike-btn-class" id={dislikeBtnId}><i className="fas fa-thumbs-down"></i></button>
            } else {
                likeBtn = <button onClick={this.handleLikeComment} className="comment-like-btn-class" id={likeBtnId}><i className="fas fa-thumbs-up"></i><span>{this.props.comment.likerIds.length}</span></button>
                dislikeBtn = <button onClick={this.handleDislikeComment} className="comment-dislike-btn-class" id={dislikeBtnId}><i className="fas fa-thumbs-down"></i></button>
            }



            // set up list of reply comments if any
            let repliesList = ''
            if (this.props.comment.replyIds.length > 0) {
                repliesList = <ReplysListContainer parent={this.props.comment} />
            }
            
            let replyCommentFormId = `reply-comment-form-${this.props.comment.id}`
            let repliesSection = '';
            let replyBtn = '';
            if (this.props.comment.parentId === null) {
                repliesSection = <>
                                    <div id={replyCommentFormId} className="reply-comment-form">
                                        <CommentFormContainer handleUpdateAfterReply={this.handleUpdateAfterReply} parentId={this.props.comment.id} />
                                    </div>
                                    { repliesList }
                                </>
                replyBtn = <button id="reply-btn" onClick={this.handleOpenReplyForm}>REPLY</button>
            }
            
            if (this.state.editMode) {
                return(
                    <div key={this.props.comment} className="comment-list-item-container">
                        <div>
                            <Link to='/' className="commenter-icon" style={iconStyle}>
                                {this.props.author.username[0].toUpperCase()}
                            </Link>
                            <EditCommentFormContainer comment={this.props.comment} />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={this.props.comment} className="comment-list-item-container">
                        <div>
                            <Link to='/' className="commenter-icon" style={iconStyle}>
                                {this.props.author.username[0].toUpperCase()}
                            </Link>
                            <div id="comment-details">
                                <Link to='/'>{this.props.author.username} <span>{timeSinceUpload(this.props.comment.uploadDate)}</span> {editedTag}</Link>
                                <p>{this.props.comment.content}</p>
                                <div id="comment-btns">
                                    {likeBtn}
                                    {dislikeBtn}
                                    {replyBtn}
                                </div>
                                {repliesSection}
                            </div>
                        </div>
                        <button onClick={this.handlePopup} id="comment-options-btn"><i className="fas fa-ellipsis-v"></i></button>
                        {commentPopup}
                    </div>
                )
            }
        }
    }
}

export default CommentListItem;