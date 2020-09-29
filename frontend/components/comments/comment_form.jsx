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
    }

    componentDidUpdate() {
        // debugger
        let submitBtn = document.getElementById("comment-form-submit-btn");
        if (submitBtn) {
            if (this.state.content.length === 0) {
                submitBtn.setAttribute('disabled', '');
            } else {
                submitBtn.removeAttribute('disabled', '');
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
        this.setState({content: '', active: false});
    }

    handleSubmit() {
        this.props.createComment(this.props.videoId, {content: this.state.content});
        this.hideButtons();
    }

    redirectToLogin() {
        this.props.history.push("/login");
    }

    render() {
        
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
            commenterIcon = <Link to='/login' className="commenter-icon" style={{backgroundColor: "lightgray"}}></Link>
            inputAction = this.redirectToLogin
        }

        // if user is active in the form, show the comment form buttons, otherwise
        // hide the buttons
        let buttonDiv = ''
        if (this.state.active) {
            buttonDiv = <div id="comment-form-btns-container">
                            <button type="button" onClick={this.hideButtons} id="comment-form-cancel-btn">CANCEL</button>
                            <button type="button" onClick={this.handleSubmit} id="comment-form-submit-btn">COMMENT</button>
                        </div>
        }
        // debugger
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
    }
};

export default CommentForm;