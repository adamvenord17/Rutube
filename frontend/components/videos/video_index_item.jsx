import React from 'react';
import { Link } from 'react-router-dom';
import { timeSinceUpload } from '../../util/format_util';

// passed in props:
// video
// users

class VideoIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.hashCode = this.hashCode.bind(this);
        this.intToRGB = this.intToRGB.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
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

    render() {
        if (this.props.users[this.props.video.uploaderId]) {
            let videoShowUrl = `/api/videos/${this.props.video.id}`;
            let uploader = this.props.users[this.props.video.uploaderId];
            let iconColor = this.intToRGB(this.hashCode(uploader.username))
            let iconStyle = {
                backgroundColor: `#${iconColor}`
            };
            // debugger
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
                            <p>{uploader.username}</p>
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