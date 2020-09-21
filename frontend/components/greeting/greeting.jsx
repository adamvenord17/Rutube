import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {
    render() {
        if (this.props.currentUser) {
            return (
                <div>
                    <p>Welcome to Rutube, {this.props.currentUser.username}</p>
                    <button onClick={this.props.logout}>Logout</button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Login</Link>
                </div>
            )
        }
    }
}

export default Greeting;