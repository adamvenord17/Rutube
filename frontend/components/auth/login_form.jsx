import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    moveToPassword() {
        let usernameContainer = document.getElementsByClassName("input-container username")[0];
        let passwordContainer = document.getElementsByClassName("input-container password")[0];
        usernameContainer.classList.add("hide");
        passwordContainer.classList.add("show");
    }

    moveToUsername() {
        let usernameContainer = document.getElementsByClassName("input-container username")[0];
        let passwordContainer = document.getElementsByClassName("input-container password")[0];
        usernameContainer.classList.remove("hide");
        passwordContainer.classList.remove("show");
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    render() {
        let formTypeText = this.props.formType === "Login" ? "Sign In" : "Sign Up";
        let oppositeForm = this.props.formType === "Login" ? "/signup" : "/login";
        let passwordClass = this.props.errors.length === 0 ? "input-container password" : "input-container password show errors";
        let errorsMessage = this.props.errors.length === 0 ? "" : `⚠ ${this.props.errors[0]}, please try again`;
        return (
            <main className="signup-login-form-container">
                <span className="signup-login-logo"><span className="iconify" data-icon="mdi-language-ruby"></span>Rutube</span>
                <span className="signup-login-title">{formTypeText}</span>
                <span className="signup-login-after-title">to continue to Rutube</span>
                <form>
                    <div className="input-container username">
                        <input
                            type="text"
                            onChange={this.handleChange('username')}
                            value={this.state.username}
                        />
                        <label>Username</label>
                        <Link to={oppositeForm}>Create account</Link>
                        <button className="username-next-btn" onClick={this.moveToPassword}>Next</button>
                    </div>

                    <div className={passwordClass}>
                        <input
                            type="password"
                            onChange={this.handleChange('password')}
                            value={this.state.password}
                        />
                        <label>Password</label><span className="errors-message">{errorsMessage}</span>
                        <button className="password-next-btn" onClick={this.handleSubmit}>Next</button>
                    </div>
                </form>
            </main>
        )
    }

}

export default LoginForm;