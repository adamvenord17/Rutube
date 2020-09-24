import React from 'react';
import { Link } from 'react-router-dom';

class SmallSideBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <section id="small-sidebar-container">
                <Link id="sidebar-home-link" to='/'>
                    <i className="fas fa-home"></i>
                    <span id="small-sidebar-span-home">Home</span>
                </Link>
                
                <a href="https://github.com/adamvenord17">
                    <i className="fab fa-github"></i>
                    <span id="small-sidebar-span-github">GitHub</span>
                </a>
                
                <a href="https://www.linkedin.com/in/nicholas-draper/">
                    <i className="fab fa-linkedin"></i>
                    <span id="small-sidebar-span-linkedin">LinkedIn</span>
                </a>
            </section>
        )
    }
}

export default SmallSideBar;