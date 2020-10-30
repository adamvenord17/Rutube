import React from 'react';
import { Link } from 'react-router-dom';
import { timeSinceUpload } from '../../util/format_util';

class VideoIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.hashCode = this.hashCode.bind(this);
        this.intToRGB = this.intToRGB.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);

        this.handleUsernameEnter = this.handleUsernameEnter.bind(this);
        this.handleUsernameOut = this.handleUsernameOut.bind(this);
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
        if (this.props.users[this.props.video.uploaderId]) {
            let videoShowUrl = `/api/videos/${this.props.video.id}`;
            let uploader = this.props.users[this.props.video.uploaderId];
            let iconColor = this.intToRGB(this.hashCode(uploader.username))
            let iconStyle = {
                backgroundColor: `#${iconColor}`
            };
            let channelLink = `/api/channels/${uploader.id}`
            let usernamePopupId = `username-popup-${this.props.video.uploaderId}`
            return(
                <Link to={videoShowUrl}>
                    <div id="video-index-video-sleeve">
                        <video onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} src={this.props.video.videoUrl} muted></video>
                    </div>
                    <div id="video-index-item-info-container">
                        <div className="uploader-icon" style={iconStyle}>
                            {uploader.username[0].toUpperCase()}
                        </div>
                        <div id="video-index-item-info">
                            <p id="video-index-item-title">{this.props.video.title}</p>
                            <Link onMouseEnter={this.handleUsernameEnter} onMouseLeave={this.handleUsernameOut} to={channelLink}>{uploader.username}</Link>
                            <div className="username-popup" id={usernamePopupId}>{uploader.username}</div>
                            <p>{this.props.video.numViews} views • {timeSinceUpload(this.props.video.uploadDate)}</p>
                        </div>
                    </div>
                </Link>
            )
        } else {
            return(
                <div>
                    Nothing user associated with video...
                </div>
            )
        }
        
    }
}

export default VideoIndexItem;