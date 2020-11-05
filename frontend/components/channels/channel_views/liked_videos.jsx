import React from 'react';
import VideoIndexItem from "../../videos/video_index_item_container";

class LikedVideos extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.fetchLikedVideos({likerId: this.props.channelOwnerId});
    }

    render() {

        let videos = Object.values(this.props.videos).map((video) => {
            return <div key={video.id} className="video-item"><VideoIndexItem video={video} /></div>
        })

        if (videos.length === 0) {
            videos = <div style={{marginLeft: '20px'}}>Videos that you like will appear here. It doesn't look like you have liked any videos yet!</div>
        }

        return(
            <div id="channel-view-container">
                <div id="channel-home-container">
                    <div className="channel-view-title">Liked Videos</div>
                    <div id="channel-home-liked-videos">
                        {videos}
                    </div>
                </div>
            </div>
        )
    }
}

export default LikedVideos;