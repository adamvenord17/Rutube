import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

    render() {
        let userButton = '';
        if (this.props.currentUser) {
            let firstLetter = this.props.currentUser.username[0];
            userButton = <button id="user-btn">{firstLetter}</button>
        } else {
            userButton = <Link to="/login" id="sign-in-btn"><i className='fas fa-user-circle'></i>SIGN IN</Link>
        }
        return(
            <header id="nav-bar">
                <div className="nav-icons left">
                    <button id="sidebar-options-btn">&#x2630;</button>
                    <button id="logo-btn"><span class="iconify" data-icon="mdi-language-ruby"></span>Rutube</button>
                </div>
                <form class="search-bar">
                    <input type="text" placeholder="Search"/>
                    <button>&#x1F50D;</button>
                </form>
                <div className="nav-icons right">
                    <button id="add-video-btn">&#x1F4F9;</button>
                    {userButton}
                </div>
            </header>
        )
    }
}

export default NavBar;