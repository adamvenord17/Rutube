import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';

class VideoIndex extends React.Component {

    render() {
        return(
            <main class="video-index-container">
                <NavBarContainer />
                <h1>This is the VideoIndex Component</h1>
            </main>
        )
    }
}

export default VideoIndex;