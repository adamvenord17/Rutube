import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import {Link} from 'react-router-dom';
import NextVideoItem from './next_video_item';
import SideBarContainer from '../side_bar/side_bar_container';

class VideoShow extends React.Component {

    constructor(props) {
        super(props);

        this.hashCode = this.hashCode.bind(this);
        this.intToRGB = this.intToRGB.bind(this);
        this.sliderClick = this.sliderClick.bind(this);
        this.handleRemoveVideo = this.handleRemoveVideo.bind(this);
    }

    componentDidMount() {
        this.props.fetchVideos();
    }

    handleRemoveVideo() {
        this.props.removeVideo(this.props.currentVideo.id);
        this.props.history.push('/');
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

    sliderClick() {
        // debugger
        let slider = document.getElementById("slider-btn");
        slider.classList.toggle("right");
    }

    render() {
        
        if (!this.props.currentVideo) {
            return null;
        } else if (!this.props.users[this.props.currentVideo.uploaderId]) {
            this.props.fetchUser(this.props.currentVideo.uploaderId);
            return null;
        } else {
            let uploader = this.props.users[this.props.currentVideo.uploaderId];
            let iconColor = this.intToRGB(this.hashCode(uploader.username));
            let iconStyle = {
                backgroundColor: `#${iconColor}`
            };
            let isCurrentUser = (this.props.currentVideo.uploaderId === this.props.currentUserId);

            let nextVideos = Object.values(this.props.videos).map(video => {
                if (video.id != this.props.currentVideo.id) {
                    return <NextVideoItem key={video.id} fetchUser={this.props.fetchUser} users={this.props.users} video={video}/>
                }
            });

            let videoShowOptionsBtns = '';

            if (isCurrentUser) {
                videoShowOptionsBtns = <div id="video-show-options-btns">
                                            <button onClick={this.props.openModalEdit} id="edit-btn">EDIT</button>
                                            <button onClick={this.handleRemoveVideo} id="delete-btn">REMOVE</button>
                                        </div>
            } else {
                videoShowOptionsBtns = <div id="video-show-options-btns">
                                            <button id="subscribe-btn">SUBSCRIBE</button>
                                        </div>
            }

            let sideBarButton = '';

            if (this.props.isModal) {
                sideBarButton = <button onClick={this.props.closeModal} id="navbar-options-btn" className="special">&#x2630;</button>
            } else {
                sideBarButton = <button onClick={this.props.openModalSidebar} id="navbar-options-btn" className="special">&#x2630;</button>
            }

            return(
                <div id="video-show-component">
                    <NavBarContainer />
                    <div className="scrollable">
                    {sideBarButton}
                        <main id="video-show-container">
                            <div id="video-content-container">
                                <div id="video-content">
                                    <video src={this.props.currentVideo.videoUrl} autoPlay controls></video>
                                    <div id="video-show-info">
                                        <p className="strong-p">{this.props.currentVideo.title}</p>
                                        <div id="video-show-title-views">
                                            <p className="weak-p">123 views • Aug 20, 2020</p>
                                            <div id="video-show-buttons">
                                                <button id="like-btn"><i className="fas fa-thumbs-up"></i>55</button>
                                                <button id="dislike-btn"><i className="fas fa-thumbs-down"></i>12</button>
                                                <button id="share-btn"><i className="fas fa-share"></i>Share</button>
                                                <button id="save-btn"><i className="fas fa-folder-plus"></i>Save</button>
                                                <button id="ellipsis-btn"><i className="fas fa-ellipsis-h"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="video-user-info">
                                        <div>
                                            <Link to='/' className="uploader-icon" style={iconStyle}>
                                                {uploader.username[0].toUpperCase()}
                                            </Link>
                                            <div id="video-info">
                                                <Link to='/' className="username">{uploader.username}</Link>
                                                <p className="subscriber-count">12.1K subscribers sub</p>
                                                <p className="video-body">{this.props.currentVideo.body}</p>
                                            </div>
                                        </div>
                                        {videoShowOptionsBtns}
                                    </div>
                                </div>
                                <div id="video-comments-container">
                                    comments container
                            </div>
                            </div>
                            <div id="next-videos-container">
                                <div id="next-videos-title-container">
                                    <p>Up next</p>
                                    <div>
                                        <p>AUTOPLAY</p>
                                        <div id="slider-bar">
                                            <div onClick={this.sliderClick} id='slider-btn'></div>
                                        </div>
                                    </div>
                                </div>
                                {nextVideos}
                            </div>
                        </main>
                    </div>
                </div>
            )
        }
    }
}

export default VideoShow;