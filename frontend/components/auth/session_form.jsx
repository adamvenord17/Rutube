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
        // 
        // if (this.props.currentUser !== null) {
        //     return (
        //         <>
        //             <Redirect to="/" />
        //         </>
        //     )
        // }
        let formTypeText = this.props.formType === "Login" ? "Log In" : "Sign Up";
        let oppositeForm = this.props.formType === "Login" ? "/signup" : "/login";
        let oppositeFormText = this.props.formType === "Login" ? "Sign Up" : "Log in";
        return (
            <>
                <h3>{formTypeText}</h3>
                <ul>
                    {this.props.errors}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <label>Username:
                        <input
                            type="text"
                            onChange={this.handleChange('username')}
                            value={this.state.username}
                        />
                    </label>

                    <label>Email:
                        <input
                            type="text"
                            onChange={this.handleChange('email')}
                            value={this.state.email}
                        />
                    </label>

                    <label>Password:
                        <input
                            type="password"
                            onChange={this.handleChange('password')}
                            value={this.state.password}
                        />
                    </label>

                    <button>{formTypeText}</button>
                </form>
                <Link to={oppositeForm}>{oppositeFormText}</Link>
            </>
        )
    }

}

export default SessionForm;