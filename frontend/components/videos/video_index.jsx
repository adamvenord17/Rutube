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
        this.handleScrollRight = this.handleScrollRight.bind(this);
        this.handleScrollLeft = this.handleScrollLeft.bind(this);
        this.checkScroll = this.checkScroll.bind(this);
    }

    componentDidMount() {
        this.props.fetchVideos();
        this.props.fetchTags();
        addEventListener("resize", this.checkScroll);
    }

    componentWillUnmount() {
        removeEventListener("resize", this.checkScroll);
    }

    handleScrollRight() {
        document.getElementById("genre-header").scrollBy({
                                                        top: 0,
                                                        left: 400,
                                                        behavior: 'smooth'
                                                        });
        document.getElementById("genre-header-left").classList.remove("hide");
        setTimeout(this.checkScroll, 700)
    }

    handleScrollLeft() {
        document.getElementById("genre-header").scrollBy({
                                                        top: 0,
                                                        left: -400,
                                                        behavior: 'smooth'
                                                        });

        document.getElementById("genre-header-right").classList.remove("hide");                                              
        setTimeout(this.checkScroll, 700)
    }

    checkScroll() {
        let elem = document.getElementById("genre-header");
        let rightBtn = document.getElementById("genre-header-right");
        let leftBtn = document.getElementById("genre-header-left");
        if (elem.scrollWidth - elem.scrollLeft === elem.offsetWidth) {
            rightBtn.classList.add("hide");
        } else {
            rightBtn.classList.remove("hide");
        }
        if (elem.scrollWidth - elem.scrollLeft === elem.scrollWidth) {
            leftBtn.classList.add("hide");
        } else {
            leftBtn.classList.remove("hide");
        }
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
                            <header onResize={this.checkScroll} id="genre-header">
                                <button id="all-tags-btn" onClick={this.handleAllTagClick} className="tag-selected">All</button>
                                {tagsLi}
                                <div id="genre-header-left" className="hide">
                                    <button className="genre-header-btn" onClick={this.handleScrollLeft}><i className="fas fa-chevron-left"></i></button>
                                </div>
                                <div id="genre-header-right">
                                    <button className="genre-header-btn" onClick={this.handleScrollRight}><i className="fas fa-chevron-right"></i></button>
                                </div>
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