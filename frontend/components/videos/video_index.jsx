import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SideBarContainer from '../side_bar/side_bar_container';
import SmallSideBar from '../side_bar/small_side_bar';

class VideoIndex extends React.Component {

    componentDidMount() {
        this.props.fetchVideos();
    }

    render() {
        return(
            <>
                <NavBarContainer />
                <main className="row">
                    <SideBarContainer />
                    <SmallSideBar />
                    <section id="video-index-container" className="extend">
                        <header id="genre-header">
                            <button type="button">All</button>
                            <button type="button">Music</button>
                            <button type="button">Cars</button>
                            <button type="button">Funny</button>
                            <button type="button">Video Games</button>
                            <button type="button">Coding</button>
                            <button type="button">Tech</button>
                            <button type="button">Travel</button>
                            <button type="button">Cats</button>
                            <button type="button">Space</button>
                            <button type="button">Sleep</button>
                            <button type="button">Meditation</button>
                            <button type="button">Study</button>
                            <button type="button">Magic</button>
                            <button type="button">Jupiter</button>
                            <button type="button">Green</button>
                            <button type="button">Seltzer</button>
                            <button type="button">Craft Beer</button>
                            <button type="button">Wine</button>
                            <button type="button">Apples</button>
                        </header>
                        <content id="videos-container">
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                            <li className="video-item"></li>
                        </content>
                    </section>
                </main>
            </>
        )
    }
}

export default VideoIndex;