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
        this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
        this.moveToPassword = this.moveToPassword.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
        let main = document.getElementsByClassName("signup-login-form-container")[0];
        main.addEventListener("keypress", e => {
            if (e.which == '13') {
                e.preventDefault();
                this.moveToPassword(e);
            }
        });
    }

    handleChange(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleDemoSubmit() {
        const user = {
            username: "DemoUser",
            password: "password"
        };
        this.props.processForm(user);
    }

    togglePasswordShow(e) {
        e.preventDefault();
        let passwordInput = document.getElementById("login-password");
        let passwordShowBtn = document.getElementById("show-password-btn-icon");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordShowBtn.classList.remove("fa-eye-slash");
            passwordShowBtn.classList.add("fa-eye");
        } else {
            passwordInput.type = "password";
            passwordShowBtn.classList.remove("fa-eye");
            passwordShowBtn.classList.add("fa-eye-slash");
        }
    }

    moveToPassword(e) {
        e.preventDefault();
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
                            required
                        />
                        <label>Username</label>
                        <Link to={oppositeForm}>Create account</Link>
                        <button type="button" className="username-next-btn" onClick={this.moveToPassword}>Next</button>
                        <span id="or-demo">or</span>
                        <button type="button" onClick={this.handleDemoSubmit} id="demo-login-btn">Sign in as a demo user</button>
                    </div>

                    <div className={passwordClass}>
                        <input
                            type="password"
                            id="login-password"
                            onChange={this.handleChange('password')}
                            value={this.state.password}
                            required
                        />
                        <label id="login-password-label">Password</label><span className="errors-message">{errorsMessage}</span>
                        <button type="button" id="back-to-username-link" onClick={this.moveToUsername}>Back to username</button>
                        <button className="password-next-btn" onClick={this.handleSubmit}>Next</button>
                        <button type="button" id="login-show-password-btn" onClick={this.togglePasswordShow}><i id="show-password-btn-icon" className="fas fa-eye-slash"></i></button>
                    </div>

                </form>
            </main>
        )
    }

}

export default LoginForm;