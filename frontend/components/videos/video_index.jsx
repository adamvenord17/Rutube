import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import SideBarContainer from '../side_bar/side_bar_container';
import SmallSideBar from '../side_bar/small_side_bar';
import VideoIndexItemContainer from './video_index_item_container';

class VideoIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tagSelected: null
        }

        this.handleTagClick = this.handleTagClick.bind(this);
        this.handleAllTagClick = this.handleAllTagClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchVideos();
        this.props.fetchTags();
    }

    handleTagClick(e) {
        let tagClicked = e.target;
        document.getElementsByClassName("tag-selected")[0].classList.remove("tag-selected")
        tagClicked.classList.add("tag-selected")
        this.setState({tagSelected: e.target.innerText})
    }

    handleAllTagClick(e) {
        let tagClicked = e.target;
        document.getElementsByClassName("tag-selected")[0].classList.remove("tag-selected")
        tagClicked.classList.add("tag-selected")
        this.setState({tagSelected: null});
    }

    render() {
        if (this.props.videos && this.props.tags) {
        
            let tagsLi = Object.values(this.props.tags).map(tag => {
                let tagIdName = `tag-btn-${tag.id}`;
                return <button key={tag.id} id={tagIdName} onClick={this.handleTagClick}>{tag.name}</button>
            })
            
            let videosLi = Object.values(this.props.videos)
            if (this.state.tagSelected) {
                videosLi = videosLi.filter(video => video.tags.includes(this.state.tagSelected))
            }
            videosLi = videosLi.map(video => <li key={video.id} className="video-item"><VideoIndexItemContainer video={video} /></li>)
            
            return (
                <>
                    <NavBarContainer />
                    <main className="row">
                        <SideBarContainer />
                        <SmallSideBar />
                        <section id="video-index-container" className="extend">
                            <header id="genre-header">
                                <button id="all-tags-btn" onClick={this.handleAllTagClick} className="tag-selected">All</button>
                                {tagsLi}
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