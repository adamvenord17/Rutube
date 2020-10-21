import React from "react";
import { Link } from "react-router-dom";
class CommentForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            content: '',
            active: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.showButtons = this.showButtons.bind(this);
        this.hideButtons = this.hideButtons.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnterEdit = this.handleEnterEdit.bind(this);
        this.handleLeaveEdit = this.handleLeaveEdit.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
    }

    componentDidMount() {
        if (this.props.formType === "EDIT") {
            this.handleEnterEdit();
        }
    }

    componentDidUpdate() {
        if (this.props.videoId) {
            let submitBtn = document.getElementById("comment-form-submit-btn");
            if (submitBtn) {
                if (this.state.content.length === 0) {
                    submitBtn.setAttribute('disabled', '');
                } else {
                    submitBtn.removeAttribute('disabled', '');
                }
            }
        } else {
            let submitBtn = document.getElementById(`comment-form-submit-btn-${this.props.parentId}`);
            if (submitBtn) {
                if (this.state.content.length === 0) {
                    submitBtn.setAttribute('disabled', '');
                } else {
                    submitBtn.removeAttribute('disabled', '');
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

    handleInputChange(e) {
        this.setState({ content: e.target.value });
    }

    showButtons() {
        this.setState({active: true});
    }

    hideButtons() {
        if (this.props.videoId){
            this.setState({content: '', active: false});
        } else {
            this.setState({ content: '' });
            document.getElementById(`reply-comment-form-${this.props.parentId}`).classList.remove("show");
        }
    }

    handleSubmit() {
        if (this.props.formType === "CREATE") {
            if (this.props.videoId) {
                this.props.createComment(this.props.videoId, { content: this.state.content });
            } else {
                this.props.createReply(this.props.parentId, { content: this.state.content });
                if (this.props.handleUpdateAfterReply) {
                    this.props.handleUpdateAfterReply();
                }
            }
            this.hideButtons();
        } else {
            this.props.updateComment({id: this.props.comment.id, content: this.state.content});
            this.handleLeaveEdit();
        }
    }

    handleCancelEdit() {
        this.props.updateComment({ id: this.props.comment.id, content: this.props.comment.content });
        this.handleLeaveEdit();
    }

    redirectToLogin() {
        this.props.history.push("/login");
    }

    handleEnterEdit() {
        this.setState({content: this.props.comment.content, active: true});
    }

    handleLeaveEdit() {
        this.setState({active: false, content: "loading..."});
    }

    render() {

        if (this.props.formType === "CREATE") {

            // if current user, set up commenter icon and action for clicking on the input
            // if current user, allow user to fill in input and show buttons, otherwise
            // redirect to the login page
            let commenterIcon = '';
            let inputAction = '';
            if (this.props.currentUser) {
                let iconColor = this.intToRGB(this.hashCode(this.props.currentUser.username));
                let iconStyle = {
                    backgroundColor: `#${iconColor}`
                };
                commenterIcon = <Link to='/' className="commenter-icon" style={iconStyle}>
                    {this.props.currentUser.username[0].toUpperCase()}
                </Link>
                inputAction = this.showButtons
            } else {
                commenterIcon = <Link to='/login' className="commenter-icon" style={{ backgroundColor: "lightgray" }}></Link>
                inputAction = this.redirectToLogin
            }

            let commentSubmitBtnId = "comment-form-submit-btn"
            if (this.props.parentId) {
                commentSubmitBtnId = `comment-form-submit-btn-${this.props.parentId}`
            }


            // if user is active in the form, show the comment form buttons, otherwise
            // hide the buttons
            let buttonDiv = ''
            if (this.state.active) {
                buttonDiv = <div id="comment-form-btns-container">
                    <button type="button" onClick={this.hideButtons} id="comment-form-cancel-btn">CANCEL</button>
                    <button type="button" onClick={this.handleSubmit} id={commentSubmitBtnId}>COMMENT</button>
                </div>
            }

            return(
                <div id="comment-form-container">
                    <div id="comment-form-input-and-icon">
                        {commenterIcon}
                        <div>
                            <input type="text" onClick={inputAction} onChange={this.handleInputChange} value={this.state.content} placeholder="Add a public comment..." required/>
                            <div id="comment-form-input-underline">
                            </div>
                        </div>
                    </div>
                    {buttonDiv}
                </div>
            )
        } else {
            let commentSubmitBtnId = "comment-form-submit-btn"
            if (this.props.parentId) {
                commentSubmitBtnId = `comment-form-submit-btn-${this.props.parentId}`
            }

            // if user is active in the form, show the comment form buttons, otherwise
            // hide the buttons
            let buttonDiv = ''
            if (this.state.active) {
                buttonDiv = <div id="comment-form-btns-container" className="inline-comment-form-btns-container">
                    <button type="button" onClick={this.handleCancelEdit} id="comment-form-cancel-btn">CANCEL</button>
                    <button type="button" onClick={this.handleSubmit} id={commentSubmitBtnId}>COMMENT</button>
                </div>
            }
            return(
                <div id="comment-form-container" className="inline-comment-form-container">
                    <div id="comment-form-input-and-icon">
                        <div>
                            <input type="text" className="inline-comment-form-input" onChange={this.handleInputChange} value={this.state.content} placeholder="Add a public comment..." required />
                            <div id="comment-form-input-underline">
                            </div>
                        </div>
                    </div>
                    {buttonDiv}
                </div>
            )
        }
    }
};

export default CommentForm;