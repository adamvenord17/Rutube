import React from "react";
import { timeSinceUpload } from "../../util/format_util";
import { Link } from "react-router-dom";

// props:
// author (user object)
// comment (comment object)

class CommentListItem extends React.Component {

    componentDidMount() {
        // debugger
        if (!this.props.author) {
            this.props.fetchUser(this.props.comment.authorId);
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

    render() {
        // debugger
        if (!this.props.author) {
            return null
        } else {
            let iconColor = this.intToRGB(this.hashCode(this.props.author.username));
            let iconStyle = {
                backgroundColor: `#${iconColor}`
            };

            return (
                <div className="comment-list-item-container">
                    <div>
                        <Link to='/' className="commenter-icon" style={iconStyle}>
                            {this.props.author.username[0].toUpperCase()}
                        </Link>
                        <div id="comment-details">
                            <Link to='/'>{this.props.author.username} <span>{timeSinceUpload(this.props.comment.uploadDate)}</span></Link>
                            <p>{this.props.comment.content}</p>
                            <div id="comment-btns">
                                <button type="button" id="comment-like-btn"><i className="fas fa-thumbs-up"></i></button>
                                <button type="button" id="comment-dislike-btn"><i className="fas fa-thumbs-down"></i></button>
                                <button id="reply-btn">REPLY</button>
                            </div>
                        </div>
                    </div>
                    <button id="comment-options-btn"><i className="fas fa-ellipsis-v"></i></button>
                </div>
            )
        }
        
    }
}

export default CommentListItem;