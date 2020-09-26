import React from 'react';
import { Link } from 'react-router-dom';

// passed in props:
// video
// users

class VideoIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            views: (Math.floor(Math.random() * 100) + 1)
        };

        this.hashCode = this.hashCode.bind(this);
        this.intToRGB = this.intToRGB.bind(this);
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
                        <video src={this.props.video.videoUrl}></video>
                    </div>
                    <div id="video-index-item-info-container">
                        <div className="uploader-icon" style={iconStyle}>
                            {uploader.username[0].toUpperCase()}
                        </div>
                        <div id="video-index-item-info">
                            <p id="video-index-item-title">{this.props.video.title}</p>
                            <p>{uploader.username}</p>
                            <p>{this.state.views} views -- 1 month ago</p>
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