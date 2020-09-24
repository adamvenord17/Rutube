import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            confirmPassword: "",
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    handleChange(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            const user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            };
            this.setState({ errors: [] });
            this.props.processForm(user);
        } else {
            this.setState({ errors: ["Passwords do not match."]});
        }
    }

    togglePasswordShow(e) {
        e.preventDefault();
        let passwordInput = document.getElementById("password");
        let confirmInput = document.getElementById("confirm");
        let passwordShowBtn = document.getElementById("show-password-btn-icon");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            confirmInput.type = "text";
            passwordShowBtn.classList.remove("fa-eye-slash");
            passwordShowBtn.classList.add("fa-eye");
        } else {
            passwordInput.type = "password";
            confirmInput.type = "password";
            passwordShowBtn.classList.remove("fa-eye");
            passwordShowBtn.classList.add("fa-eye-slash");
        }
    }

    render() {
        let errors = this.props.errors.concat(this.state.errors);

        let formTypeText = this.props.formType === "Login" ? "Sign In" : "Sign Up";
        
        let usernameClass = "input-container username signup";
        let emailClass = "input-container email signup";
        let passwordClass = "input-container password signup";
        let confirmClass = "input-container confirm signup";
        // debugger
        let errorMessages = errors.map(error => {
            // debugger
            let errorId = '';
            if (error.includes("Password is")) {
                errorId = "passwordLengthError";
                passwordClass = "input-container password signup errors";
            } else if (error.includes("Passwords do")) {
                errorId = "passwordMatchError";
                confirmClass = "input-container confirm signup errors";
            } else if (error.includes("Email")) {
                errorId = "emailError";
                emailClass = "input-container email signup errors";
            } else if (error.includes("Username")) {
                errorId = "usernameError";
                usernameClass = "input-container username signup errors";
            }
            error = `⚠ ${error}`;
            return <li key={error} id={errorId} className="error-message-li">{error}</li>;
        })
        // debugger
        return (
            <div>
                <main className="signup-login-form-container signup">
                    <div className="signup-left">
                        <Link to="/" id="signup-logo"><span className="iconify" data-icon="mdi-language-ruby"></span>Rutube</Link>
                        <span className="signup-login-title signup">{formTypeText}</span>
                        <span className="signup-login-after-title signup">to continue to Rutube</span>
                        <form>
                            <div className={usernameClass}>
                                <input
                                    type="text"
                                    onChange={this.handleChange('username')}
                                    value={this.state.username}
                                    required
                                />
                                <label>Username</label>
                            </div>

                            <div className={emailClass}>
                                <input
                                    type="text"
                                    onChange={this.handleChange('email')}
                                    value={this.state.email}
                                    required
                                />
                                <label>Email</label>
                            </div>

                            <div className={passwordClass}>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={this.handleChange('password')}
                                    value={this.state.password}
                                    required
                                />
                                <label>Password</label>
                            </div>

                            <div className={confirmClass}>
                                <input
                                    type="password"
                                    id="confirm"
                                    onChange={this.handleChange('confirmPassword')}
                                    value={this.state.confirmPassword}
                                    required
                                />
                                <label>Confirm</label>
                            </div>
                            <button type="button" id="show-password-btn" onClick={this.togglePasswordShow}><i id="show-password-btn-icon"className="fas fa-eye-slash"></i></button>
                            <ul className="errors-message login">{errorMessages}</ul>
                            <Link to="/login">Sign in instead</Link>
                            <button className="password-next-btn" onClick={this.handleSubmit}>Next</button>
                        </form>
                    </div>
                    <div className="signup-right">
                        <i id="signup-icon" className='fas fa-user-circle'></i>
                        <span id="signup-blurb">One account to rule them all. The full power of Rutube awaits you!</span>
                    </div>
                </main>
                <footer id="login-footer" class="signup-footer">
                    <span id="language">English (United States)</span>
                    <ul id="login-page-links">
                        <li>
                            <a href="https://github.com/adamvenord17">GitHub</a>
                        </li>
                        <li>
                            <a href="https://github.com/adamvenord17/Rutube">Project Repo</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/nicholas-draper/">LinkedIn</a>
                        </li>
                    </ul>
                </footer>
            </div>
        )
    }

}

export default SignupForm;