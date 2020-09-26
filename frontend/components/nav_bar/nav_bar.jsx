import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.handleUserDropdown = this.handleUserDropdown.bind(this);
        this.showSidebar = this.showSidebar.bind(this);
        this.hashCode = this.hashCode.bind(this);
        this.intToRGB = this.intToRGB.bind(this);
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

    showSidebar() {
        let sideBar = document.getElementById("sidebar-container");
        let videoIndex = document.getElementById("video-index-container");
        let smallSideBar = document.getElementById("small-sidebar-container");
        smallSideBar.classList.add("hide");
        sideBar.classList.remove("hide");
        videoIndex.classList.remove("extend");
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
        let addVideoBtn = ''
        if (this.props.currentUser) {
            let iconColor = this.intToRGB(this.hashCode(this.props.currentUser.username))
            let iconBackgroundStyle = {
                backgroundColor: `#${iconColor}`
            };
            let iconStyle = {
                color: `#${iconColor}`
            };
            addVideoBtn = <button onClick={this.props.openModal} className="nav-bar-right-links addVideo"><i className="far fa-file-video"></i></button>
            let firstLetter = this.props.currentUser.username[0];
            userButton = <button onClick={this.handleUserDropdown} id="user-btn" style={iconBackgroundStyle} >{firstLetter}</button>
            addVideoBtnClass = "add-video-btn-online";
            userDropdown = <div className="user-drop-down hide">
                                <header id="dropdown-header" className="clearfix">
                                        <span><i id="dropdown-header-user-icon" style={iconStyle} className='fas fa-user-circle'></i></span>
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
            addVideoBtnClass = "add-video-btn-offline";
            addVideoBtn = <Link to="/login" className="nav-bar-right-links addVideo"><i className="far fa-file-video"></i></Link>
        }
        return(
            <div>
                <header id="nav-bar">
                    <div className="nav-icons left">
                        <button onClick={this.showSidebar} id="navbar-options-btn">&#x2630;</button>
                        <button id="logo-btn"><span className="iconify" data-icon="mdi-language-ruby"></span>Rutube</button>
                    </div>
                    <form className="search-bar clear-fix">
                        <input type="text" placeholder="Search"/>
                        <button><i className="fas fa-search"></i></button>
                    </form>
                    <div className="nav-icons right">
                        {addVideoBtn}
                            <span className="popup-descriptions upload-video-popup">Upload Video</span>
                        <a className="nav-bar-right-links github" href="https://github.com/adamvenord17/Rutube"><i className="fab fa-github"></i></a>
                            <span className="popup-descriptions github-popup">Project Repo</span>
                        <a className="nav-bar-right-links linkedin" href="https://www.linkedin.com/in/nicholas-draper/"><i className="fab fa-linkedin"></i></a>
                            <span className="popup-descriptions linkedin-popup">LinkedIn Profile</span>
                        {userButton}
                        {userDropdown}
                    </div>
                </header>
            </div>
        )
    }
}

export default NavBar;