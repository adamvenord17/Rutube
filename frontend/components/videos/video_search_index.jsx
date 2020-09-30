import React from 'react';
import NextVideoItem from './next_video_item';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SideBarContainer from '../side_bar/side_bar_container';
import SmallSideBar from '../side_bar/small_side_bar';

class VideoSearchIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchVideos(this.props.bounds);
    }

    render() {

        if (this.props.videos) {
            let videoSearchResults = Object.values(this.props.videos).map(video => {
                return <NextVideoItem key={video.id} fetchUser={this.props.fetchUser} users={this.props.users} video={video} />
            })

            return(
                <>
                    <NavBarContainer />
                    <main className="row">
                        <SideBarContainer />
                        <SmallSideBar />
                        <div id="video-search-index-container">
                            <div id="search-results-container">
                                <div><i className="fas fa-sliders-h"></i><span>FILTER</span></div>
                                {videoSearchResults}
                            </div>
                        </div>
                    </main>
                </>  
            )
        } else {
            return null;
        }
    }
}

export default VideoSearchIndex;