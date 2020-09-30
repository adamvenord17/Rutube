import React from "react";
import { timeSinceUpload } from "../../util/format_util";
import { Link } from "react-router-dom";
import EditCommentFormContainer from "./edit_comment_form_container";

// props:
// author (user object)
// comment (comment object)

class CommentListItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            editMode: false
        };

        this.handlePopup = this.handlePopup.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        // debugger
        if (!this.props.author) {
            this.props.fetchUser(this.props.comment.authorId);
        }

        this.handlePopup = this.handlePopup.bind(this);
    }

    componentDidUpdate() {
        // debugger
        if (document.getElementsByClassName("inline-comment-form-container")[0]) {
            if (document.getElementsByClassName("inline-comment-form-input")[0].value.length > 0) {
                if (!document.getElementsByClassName("inline-comment-form-btns-container")[0]) {
                    this.setState({editMode: false});
                }
            }
        }
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
        this.props.deleteComment(this.props.comment.id);
    }

    handleEdit() {
        this.setState({editMode: true});
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

            let editedTag = '';
            if (this.props.comment.isEdited) {
                editedTag = <span>(edited)</span>
            }

            if (this.state.editMode) {
                return(
                    <div className="comment-list-item-container">
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
                    <div className="comment-list-item-container">
                        <div>
                            <Link to='/' className="commenter-icon" style={iconStyle}>
                                {this.props.author.username[0].toUpperCase()}
                            </Link>
                            <div id="comment-details">
                                <Link to='/'>{this.props.author.username} <span>{timeSinceUpload(this.props.comment.uploadDate)}</span> {editedTag}</Link>
                                <p>{this.props.comment.content}</p>
                                <div id="comment-btns">
                                    <button type="button" id="comment-like-btn"><i className="fas fa-thumbs-up"></i></button>
                                    <button type="button" id="comment-dislike-btn"><i className="fas fa-thumbs-down"></i></button>
                                    <button id="reply-btn">REPLY</button>
                                </div>
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