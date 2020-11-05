import React from 'react';
import NavBarContainer from '../nav_bar/nav_bar_container';
import { Link } from 'react-router-dom';
import NextVideoItem from './next_video_item';
import { formatDate } from '../../util/format_util';
import CommentListContainer from '../comments/comments_list_container';

class VideoShow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lastPlay: 0,
            autoPlay: false,
        }

        this.hashCode = this.hashCode.bind(this);
        this.intToRGB = this.intToRGB.bind(this);
        this.sliderClick = this.sliderClick.bind(this);
        this.handleRemoveVideo = this.handleRemoveVideo.bind(this);

        this.handleRedirectToLogin = this.handleRedirectToLogin.bind(this);
        this.handleLikeVideo = this.handleLikeVideo.bind(this);
        this.handleUnlikeVideo = this.handleUnlikeVideo.bind(this);
        this.handleDislikeVideo = this.handleDislikeVideo.bind(this);
        this.handleUndislikeVideo = this.handleUndislikeVideo.bind(this);
        this.handleChangeLikeVideo = this.handleChangeLikeVideo.bind(this);
        this.handleLikeChange = this.handleLikeChange.bind(this);
        
        this.handleAutoPlay = this.handleAutoPlay.bind(this);

        this.delayClick = this.delayClick.bind(this);

        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleUnsubscribe = this.handleUnsubscribe.bind(this);

        this.handleUsernameEnter = this.handleUsernameEnter.bind(this);
        this.handleUsernameOut = this.handleUsernameOut.bind(this);
    }

    componentDidMount() {
        this.props.fetchVideos();   
    }

    componentDidUpdate() {
        if (document.getElementById("like-btn") && document.getElementById("dislike-btn")) {
            this.handleLikeChange();
        }
    }

    handleSubscribe() {
        this.props.subscribeTo(this.props.currentVideo.uploaderId, this.props.currentUserId);
    }

    handleUnsubscribe() {
        this.props.unsubscribeTo(this.props.currentVideo.uploaderId, this.props.currentUserId);
    }

    delayClick() {
        this.props.addView(this.props.currentVideo.id);
    }

    getLikeProportion() {
        let numLikes = this.props.currentVideo.likerIds.length;
        let totalNum = this.props.currentVideo.likerIds.length + this.props.currentVideo.dislikerIds.length;
        let result = (numLikes / totalNum) * 100;
        if (result === NaN) {
            return '50%';
        } else {
            return `${result}%`;
        }
    }

    getDislikeProportion() {
        let numDislikes = this.props.currentVideo.dislikerIds.length;
        let totalNum = this.props.currentVideo.likerIds.length + this.props.currentVideo.dislikerIds.length;
        let result = (numDislikes / totalNum) * 100;
        if (result === NaN) {
            return `50%`;
        } else {
            return `${result}%`;
        }
    }

    handleLikeChange() {
        let likeBtn = document.getElementById("like-btn");
        let dislikeBtn = document.getElementById("dislike-btn");
        let likeBar = document.getElementById("like-bar");

        if (this.props.currentVideo.likerIds.includes(this.props.currentUserId)) {
            likeBtn.classList.add("like-selected");
            dislikeBtn.classList.remove("like-selected");
            likeBar.classList.add("like-selected");
        } else if (this.props.currentVideo.dislikerIds.includes(this.props.currentUserId)) {
            likeBtn.classList.remove("like-selected");
            dislikeBtn.classList.add("like-selected");
            likeBar.classList.add("like-selected");
        } else {
            likeBtn.classList.remove("like-selected");
            dislikeBtn.classList.remove("like-selected");
            likeBar.classList.remove("like-selected");
        }
    }

    handleRedirectToLogin() {
        this.props.history.push('/login');
    }

    handleLikeVideo() {
        this.props.likeVideo(this.props.currentVideo.id);
    }

    handleUnlikeVideo() {
        this.props.unlikeVideo(this.props.currentVideo.id);
    }

    handleDislikeVideo() {
        this.props.dislikeVideo(this.props.currentVideo.id);
    }

    handleUndislikeVideo() {
        this.props.undislikeVideo(this.props.currentVideo.id);
    }

    handleChangeLikeVideo() {
        this.props.changeLikeVideo(this.props.currentVideo.id);
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
        let slider = document.getElementById("slider-btn");
        slider.classList.toggle("right");

        this.state.autoPlay ? this.setState({autoPlay: false}) : this.setState({autoPlay: true})
    }

    handleAutoPlay(nextVideo) {
        return () => {
            if (this.state.autoPlay) {
                this.props.history.push(`/api/videos/${nextVideo}`)
            }
        }
    }

    handleUsernameEnter() {
        document.getElementById(`username-popup-${this.props.currentVideo.uploaderId}`).classList.add('reveal');
    }

    handleUsernameOut() {
        document.getElementById(`username-popup-${this.props.currentVideo.uploaderId}`).classList.remove('reveal');
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
                return <NextVideoItem key={video.id} fetchUser={this.props.fetchUser} users={this.props.users} video={video} itemType="SHOW"/>
            });

            let nextVideosRight = nextVideos.filter(video => video.key > this.props.currentVideo.id);
            let nextVideosLeft = nextVideos.filter(video => video.key < this.props.currentVideo.id);

            nextVideos = nextVideosRight.concat(nextVideosLeft);

            let nextVideo = nextVideos[0].key;

            // sets up a subscribe button if current user is not owner of video
            // otherwise sets up edit and remove buttons for the video
            let videoShowOptionsBtns = '';
            if (isCurrentUser) {
                videoShowOptionsBtns = <div id="video-show-options-btns">
                                            <button onClick={this.props.openModalEdit} id="edit-btn">EDIT</button>
                                            <button onClick={this.handleRemoveVideo} id="delete-btn">REMOVE</button>
                                        </div>
            } else {
                if (this.props.users[this.props.currentUserId]) {
                    if (this.props.users[this.props.currentUserId].subscriptionIds.includes(this.props.currentVideo.uploaderId)) {
                        videoShowOptionsBtns = <div id="video-show-options-btns">
                                                    <button onClick={this.handleUnsubscribe} id="unsubscribe-btn">SUBSCRIBED</button>
                                                </div>
                    } else {
                        videoShowOptionsBtns = <div id="video-show-options-btns">
                                                    <button onClick={this.handleSubscribe} id="subscribe-btn">SUBSCRIBE</button>
                                                </div>
                    }
                } else {
                    videoShowOptionsBtns = <div id="video-show-options-btns">
                                                    <button onClick={this.handleRedirectToLogin} id="subscribe-btn">SUBSCRIBE</button>
                                                </div>
                }
            }

            // sets up the like buttons and their actions based on the users current
            // status of having diliked/liked the video already
            // if no current user, both buttons should redirect to the signin page
            let likeBtn = ''
            let dislikeBtn = ''
            if (!this.props.currentUserId) {
                likeBtn = <button onClick={this.handleRedirectToLogin} id="like-btn"><i className="fas fa-thumbs-up"></i>{this.props.currentVideo.likerIds.length}</button>
                dislikeBtn = <button onClick={this.handleRedirectToLogin} id="dislike-btn"><i className="fas fa-thumbs-down"></i>{this.props.currentVideo.dislikerIds.length}</button>
            } else if (this.props.currentVideo.likerIds.includes(this.props.currentUserId)) {
                likeBtn = <button onClick={this.handleUnlikeVideo} id="like-btn"><i className="fas fa-thumbs-up"></i>{this.props.currentVideo.likerIds.length}</button>
                dislikeBtn = <button onClick={this.handleChangeLikeVideo} id="dislike-btn"><i className="fas fa-thumbs-down"></i>{this.props.currentVideo.dislikerIds.length}</button>
            } else if (this.props.currentVideo.dislikerIds.includes(this.props.currentUserId)) {
                likeBtn = <button onClick={this.handleChangeLikeVideo} id="like-btn"><i className="fas fa-thumbs-up"></i>{this.props.currentVideo.likerIds.length}</button>
                dislikeBtn = <button onClick={this.handleUndislikeVideo} id="dislike-btn"><i className="fas fa-thumbs-down"></i>{this.props.currentVideo.dislikerIds.length}</button>
            } else {
                likeBtn = <button onClick={this.handleLikeVideo} id="like-btn"><i className="fas fa-thumbs-up"></i>{this.props.currentVideo.likerIds.length}</button>
                dislikeBtn = <button onClick={this.handleDislikeVideo} id="dislike-btn"><i className="fas fa-thumbs-down"></i>{this.props.currentVideo.dislikerIds.length}</button>
            }

            // sets up the sidebar button for whether or not th modal is open or not
            let sideBarButton = '';
            if (this.props.isModal) {
                sideBarButton = <button onClick={this.props.closeModal} id="navbar-options-btn" className="special">&#x2630;</button>
            } else {
                sideBarButton = <button onClick={this.props.openModalSidebar} id="navbar-options-btn" className="special">&#x2630;</button>
            }

            // sets up proportions for the likebar, using inline react styling
            let likeBarStyle = '';
            let dislikeBarStyle = '';
            if (this.props.currentVideo) {
                likeBarStyle = {
                    width: this.getLikeProportion()
                }
                dislikeBarStyle = {
                    width: this.getDislikeProportion()
                }
            }

            // sets up blurb for subscriber count
            let subCount = this.props.users[this.props.currentVideo.uploaderId].subscriberCount;
            let subBlurb = 'No Subscribers'
            if (subCount === 1) {
                subBlurb = '1 subscriber'
            } else if (subCount > 1) {
                subBlurb = `${subCount} subscribers`
            }

            let channelLink = `/api/channels/${this.props.currentVideo.uploaderId}/home`
            let usernamePopupId = `username-popup-${this.props.currentVideo.uploaderId}`

            return(
                <div id="video-show-component">
                    <NavBarContainer />
                    <div className="scrollable">
                    {sideBarButton}
                        <main id="video-show-container">
                            <div id="video-content-container">
                                <div id="video-content">
                                    <video id="video-show-video" onPlay={this.delayClick} onEnded={this.handleAutoPlay(nextVideo)} src={this.props.currentVideo.videoUrl} autoPlay controls></video>
                                    <div id="video-show-info">
                                        <p className="strong-p">{this.props.currentVideo.title}</p>
                                        <div id="video-show-title-views">
                                            <p className="weak-p">{this.props.currentVideo.numViews} views • {formatDate(this.props.currentVideo.uploadDate)}</p>
                                            <div id="video-show-buttons">
                                                <div id="like-dislike-bar-container">
                                                    <div id="like-bar" style={likeBarStyle}></div>
                                                    <div id="dislike-bar" style={dislikeBarStyle}></div>
                                                </div>
                                                {likeBtn}
                                                {dislikeBtn}
                                                <button onClick={this.goToLinkedin} id="share-btn"><i className="fas fa-share"></i><a href="https://www.linkedin.com/in/nicholas-draper/">LinkedIn</a></button>
                                                <button onClick={this.goToGithub} id="save-btn"><i className="fas fa-folder-plus"></i><a href="https://github.com/adamvenord17">GitHub</a></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="video-user-info">
                                        <div>
                                            <Link to={channelLink} className="uploader-icon" style={iconStyle}>
                                                {uploader.username[0].toUpperCase()}
                                            </Link>
                                            <div id="video-info">
                                                <Link onMouseEnter={this.handleUsernameEnter} onMouseLeave={this.handleUsernameOut} to={channelLink}>{uploader.username}</Link>
                                                <div className="username-popup" id={usernamePopupId}>{uploader.username}</div>
                                                <p className="subscriber-count">{subBlurb}</p>
                                                <p className="video-body">{this.props.currentVideo.body}</p>
                                            </div>
                                        </div>
                                        {videoShowOptionsBtns}
                                    </div>
                                </div>
                                <CommentListContainer video={this.props.currentVideo}/>
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