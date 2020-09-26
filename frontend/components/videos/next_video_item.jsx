import React from 'react';
import { Link } from 'react-router-dom';

class NextVideoItem extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchUser(this.props.video.uploaderId);
    }

    render() {
        if (!this.props.users[this.props.video.uploaderId]) {
            return null
        } else {
            let views = (Math.floor(Math.random() * 100) + 1);
            let months = (Math.floor(Math.random() * 10) + 1);
            let uploader = this.props.users[this.props.video.uploaderId];
            let videoShowUrl = `/api/videos/${this.props.video.id}`;
            return (
                <Link to={videoShowUrl} id="next-video-item-container">
                    <video src={this.props.video.videoUrl}></video>
                    <div id="next-video-item-info">
                        <p className="strong-p">{this.props.video.title}</p>
                        <p className="weak-p">{uploader.username}</p>
                        <p className="weak-p">{views}K views • {months} month ago</p>
                    </div>
                </Link>
            )
        }
    }
};

export default NextVideoItem;