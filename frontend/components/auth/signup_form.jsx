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
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
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
        let formTypeText = this.props.formType === "Login" ? "Sign In" : "Sign Up";
        
        let usernameClass = this.props.errors.length === 0 ? "input-container username signup" : "input-container username signup errors";
        let emailClass = this.props.errors.length === 0 ? "input-container email signup" : "input-container email signup errors";
        let passwordClass = this.props.errors.length === 0 ? "input-container password signup" : "input-container password signup errors";
        let confirmClass = this.props.errors.length === 0 ? "input-container confirm signup" : "input-container confirm signup errors";
        
        
        let errorsMessage = this.props.errors.length === 0 ? "" : `⚠ ${this.props.errors[0]}, please try again`;
        return (
            <main className="signup-login-form-container signup">
                <div class="signup-left">
                    <span className="signup-login-logo"><span className="iconify" data-icon="mdi-language-ruby"></span>Rutube</span>
                    <span className="signup-login-title">{formTypeText}</span>
                    <span className="signup-login-after-title">to continue to Rutube</span>
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
                        <span className="errors-message login">{errorsMessage}</span>
                        <Link to="/login">Sign in instead</Link>
                        <button className="password-next-btn" onClick={this.handleSubmit}>Next</button>
                    </form>
                </div>
                <div class="signup-right">
                    <i id="signup-icon" className='fas fa-user-circle'></i>
                    <span id="signup-blurb">One account to rule them all. The full power of Rutube content awaits!</span>
                </div>
            </main>
        )
    }

}

export default SignupForm;