import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SideBarContainer from '../side_bar/side_bar_container';
import SmallSideBar from '../side_bar/small_side_bar';
import VideoIndexItemContainer from './video_index_item_container';

class VideoIndex extends React.Component {

    componentDidMount() {
        this.props.fetchVideos();
        this.props.fetchTags();
    }

    render() {
        if (this.props.videos) {
            let videosLi = Object.values(this.props.videos).map(video => <li key={video.id} className="video-item"><VideoIndexItemContainer video={video} /></li>)
            return (
                <>
                    <NavBarContainer />
                    <main className="row">
                        <SideBarContainer />
                        <SmallSideBar />
                        <section id="video-index-container" className="extend">
                            <header id="genre-header">
                                <a href="/">Bonus Links</a>
                                <a href="https://www.linkedin.com/in/nicholas-draper/">Personal Website</a>
                                <a href="https://www.linkedin.com/in/nicholas-draper/">LinkedIn</a>
                                <a href="https://angel.co/u/nicholas-draper-2">AngelList</a>
                                <a href="https://github.com/adamvenord17">GitHub</a>
                                <a href="https://github.com/adamvenord17/Rutube">Rutube Project Repo</a>
                                <a href="https://mongo-bread.herokuapp.com/">Bread</a>
                                <a href="https://adamvenord17.github.io/gun-runner/">GunRunner</a>
                                <a href="https://www.youtube.com/">YouTube</a>
                                <a href="https://www.appacademy.io/">AppAcademy</a>
                            </header>
                            <ul id="videos-container">
                                {videosLi}
                            </ul>
                        </section>
                    </main>
                </>
            )
        } else {
            return (
                <>
                    <NavBarContainer />
                    <main className="row">
                        <SideBarContainer />
                        <SmallSideBar />
                        <section id="video-index-container" className="extend">
                            Nothing here, no videos
                        </section>
                    </main>
                </>
            )
        }
        
    }
}

export default VideoIndex;