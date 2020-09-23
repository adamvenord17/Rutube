import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.handleUserDropdown = this.handleUserDropdown.bind(this);
    }

    handleUserDropdown() {
        let userDropdown = document.getElementsByClassName("user-drop-down")[0];
        userDropdown.classList.remove("hide");
        let body = document.getElementsByTagName("body")[0];
        body.addEventListener("click", () => {
            userDropdown.classList.add("hide");
        });
    }

    render() {
        let userButton = '';
        let addVideoBtnClass = '';
        let userDropdown = '';
        if (this.props.currentUser) {
            let firstLetter = this.props.currentUser.username[0];
            userButton = <button onClick={this.handleUserDropdown} id="user-btn">{firstLetter}</button>
            addVideoBtnClass = "add-video-btn-online";
            userDropdown = <div className="user-drop-down hide">
                                <header id="dropdown-header" className="clearfix">
                                        <span><i id="dropdown-header-user-icon" className='fas fa-user-circle'></i></span>
                                        <div id="dropdown-user-info">
                                            <p className="username">{this.props.currentUser.username}</p>
                                            <p className="email">{this.props.currentUser.email}</p>
                                        </div>
                                </header>
                                <button><i id="dropdown-user-icon" className='fas fa-user-circle'></i> Your Channel --Coming Soon!--</button>
                                <button id="last-user-dropdown-btn" onClick={this.props.logout}><i id="dropdown-logout-icon" className="fas fa-door-open"></i> Logout</button>
                            </div>
        } else {
            userButton = <Link to="/login" id="sign-in-btn"><i className='fas fa-user-circle'></i>SIGN IN</Link>
            addVideoBtnClass = "add-video-btn-ffline";
        }
        return(
            <header id="nav-bar">
                <div className="nav-icons left">
                    <button id="sidebar-options-btn">&#x2630;</button>
                    <button id="logo-btn"><span className="iconify" data-icon="mdi-language-ruby"></span>Rutube</button>
                </div>
                <form className="search-bar">
                    <input type="text" placeholder="Search"/>
                    <button>&#x1F50D;</button>
                </form>
                <div className="nav-icons right">
                    <button id={addVideoBtnClass}><i className="far fa-file-video"></i></button>
                    {userButton}
                    {userDropdown}
                </div>
            </header>
        )
    }
}

export default NavBar;