import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

    render() {
        let formTypeText = this.props.formType === "Login" ? "Sign In" : "Sign Up";
        let oppositeForm = this.props.formType === "Login" ? "/signup" : "/login";
        let oppositeFormText = this.props.formType === "Login" ? "Sign Up" : "Sign in";
        return (
            <main class="signup-login-form-container">
                <span class="signup-login-logo"><span class="iconify" data-icon="mdi-language-ruby"></span>Rutube</span>
                <span class="signup-login-title">{formTypeText}</span>
                <span class="signup-login-after-title">to continue to Rutube</span>
                <ul class="signup-login-errors">
                    {this.props.errors}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <div class="username-container">
                        <label>Username:
                            <input
                                type="text"
                                onChange={this.handleChange('username')}
                                value={this.state.username}
                            />
                        </label>
                        <button class="username-next-btn">Next</button>
                    </div>

                    <div class="password-container">
                        <label>Password:
                            <input
                                type="password"
                                onChange={this.handleChange('password')}
                                value={this.state.password}
                            />
                        </label>
                        <button class="password-next-btn">Next</button>
                    </div>
                    <button>{formTypeText}</button>
                </form>
                <Link to={oppositeForm}>{oppositeFormText}</Link>
            </main>
        )
    }

}

export default SessionForm;