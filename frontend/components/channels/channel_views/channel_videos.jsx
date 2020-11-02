import React from 'react';
import VideoIndexItem from "../../videos/video_index_item_container";

class ChannelVideos extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {

        let videos = Object.values(this.props.videos).map((video) => {
            return <div key={video.id} className="video-item"><VideoIndexItem video={video} /></div>
        })

        return(
            <div id="channel-view-container">
                <div id="channel-home-container">
                    <div className="channel-view-title">Uploads</div>
                    <div id="channel-home-videos">
                        {videos}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelVideos;