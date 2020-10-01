import React from 'react';
import NextVideoItem from './next_video_item';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SideBarContainer from '../side_bar/side_bar_container';
import SmallSideBar from '../side_bar/small_side_bar';

class VideoSearchIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let videoSearchResults = <h1>No results from search... Try something else!</h1>;
        if (this.props.videos) {
            videoSearchResults = Object.values(this.props.videos).map(video => {
                return <NextVideoItem key={video.id} fetchUser={this.props.fetchUser} users={this.props.users} video={video} itemType="SEARCH" />
            })
        }
        return(
            <>
                <NavBarContainer />
                <main className="row">
                    <SideBarContainer />
                    <SmallSideBar />
                    <div className="scrollable">
                        <section id="video-index-container" className="extend">
                                <div id="search-results-container">
                                    <div>
                                        <div>
                                            <button><i className="fas fa-sliders-h"></i><span>FILTER</span></button>
                                        </div>
                                        {videoSearchResults}
                                    </div>
                                </div>
                        </section>
                    </div>
                </main>
            </>
        )
    }
}

export default VideoSearchIndex;