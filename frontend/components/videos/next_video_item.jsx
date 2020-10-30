import React from 'react';
import { Link } from 'react-router-dom';
import { timeSinceUpload } from '../../util/format_util';

class NextVideoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleUsernameEnter = this.handleUsernameEnter.bind(this);
        this.handleUsernameOut = this.handleUsernameOut.bind(this);
    }

    componentDidMount() {
        this.props.fetchUser(this.props.video.uploaderId);
    }

    handleMouseEnter(e) {
        e.target.play();
    }

    handleMouseOut(e) {
        e.target.pause();
    }

    handleUsernameEnter() {
        document.getElementById(`username-popup-${this.props.video.uploaderId}`).classList.add('reveal');
    }

    handleUsernameOut() {
        document.getElementById(`username-popup-${this.props.video.uploaderId}`).classList.remove('reveal');
    }

    render() {
        if (!this.props.users[this.props.video.uploaderId]) {
            return null
        } else if (this.props.itemType === "SEARCH") {
            let uploader = this.props.users[this.props.video.uploaderId];
            let videoShowUrl = `/api/videos/${this.props.video.id}`;
            let channelLink = `/api/channels/${uploader.id}/home`
            let usernamePopupId = `username-popup-${this.props.video.uploaderId}`
            return (
                <Link to={videoShowUrl} id="next-video-item-container">
                    <video onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} src={this.props.video.videoUrl} muted></video>
                    <div id="next-video-item-info">
                        <p className="strong-p">{this.props.video.title}</p>
                        <p className="weak-p"><Link onMouseEnter={this.handleUsernameEnter} onMouseLeave={this.handleUsernameOut} to={channelLink}>{uploader.username}</Link> • {this.props.video.numViews} views • {timeSinceUpload(this.props.video.uploadDate)}</p>
                        <div className="username-popup" id={usernamePopupId}>{uploader.username}</div>
                        <p className="weak-p">{this.props.video.body}</p>
                    </div>
                </Link>
            )
        } else {
            let uploader = this.props.users[this.props.video.uploaderId];
            let videoShowUrl = `/api/videos/${this.props.video.id}`;
            let channelLink = `/api/channels/${uploader.id}/home`
            let usernamePopupId = `username-popup-${this.props.video.uploaderId}`
            return (
                <Link to={videoShowUrl} id="next-video-item-container">
                    <video onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} src={this.props.video.videoUrl} muted></video>
                    <div id="next-video-item-info">
                        <p className="strong-p">{this.props.video.title}</p>
                        <p className="weak-p"><Link onMouseEnter={this.handleUsernameEnter} onMouseLeave={this.handleUsernameOut} to={channelLink}>{uploader.username}</Link></p>
                        <div className="username-popup" id={usernamePopupId}>{uploader.username}</div>
                        <p className="weak-p">{this.props.video.numViews} views • {timeSinceUpload(this.props.video.uploadDate)}</p>
                    </div>
                </Link>
            )
        }
    }
};

export default NextVideoItem;