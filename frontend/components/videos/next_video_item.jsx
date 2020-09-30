import React from 'react';
import { Link } from 'react-router-dom';
import { timeSinceUpload } from '../../util/format_util';

class NextVideoItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
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
        if (!this.props.users[this.props.video.uploaderId]) {
            return null
        } else if (this.props.itemType === "SEARCH") {
            let views = (Math.floor(Math.random() * 100) + 1);
            let uploader = this.props.users[this.props.video.uploaderId];
            let videoShowUrl = `/api/videos/${this.props.video.id}`;
            return (
                <Link to={videoShowUrl} id="next-video-item-container">
                    <video onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} src={this.props.video.videoUrl} muted></video>
                    <div id="next-video-item-info">
                        <p className="strong-p">{this.props.video.title}</p>
                        <p className="weak-p">{uploader.username} • {views}K views • {timeSinceUpload(this.props.video.uploadDate)}</p>
                        <p className="weak-p">{this.props.video.body}</p>
                    </div>
                </Link>
            )
        } else {
            let views = (Math.floor(Math.random() * 100) + 1);
            let uploader = this.props.users[this.props.video.uploaderId];
            let videoShowUrl = `/api/videos/${this.props.video.id}`;
            return (
                <Link to={videoShowUrl} id="next-video-item-container">
                    <video onMouseEnter={this.handleMouseEnter} onMouseOut={this.handleMouseOut} src={this.props.video.videoUrl} muted></video>
                    <div id="next-video-item-info">
                        <p className="strong-p">{this.props.video.title}</p>
                        <p className="weak-p">{uploader.username}</p>
                        <p className="weak-p">{views}K views • {timeSinceUpload(this.props.video.uploadDate)}</p>
                    </div>
                </Link>
            )
        }
    }
};

export default NextVideoItem;