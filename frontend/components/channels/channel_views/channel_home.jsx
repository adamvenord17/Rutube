import React from 'react';
import SubscriptionItemContainer from "./subscription_item_container";
import VideoIndexItem from "../../videos/video_index_item_container";
class ChannelHome extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let subscriptions = this.props.channelOwner.subscriptionIds.map(subId => {
            return <SubscriptionItemContainer key={subId} creatorId={subId}/>
        })

        let videos = Object.values(this.props.videos).map((video) => {
            return <div key={video.id} className="video-item"><VideoIndexItem video={video} /></div>
        })

        return(
            <div id="channel-view-container">
                <div id="channel-home-container">
                    <div className="channel-view-title">Subscriptions</div>
                    <div id="channel-home-subscriptions">
                        {subscriptions}
                    </div>
                    <div id="seperator-line"></div>
                    <div className="channel-view-title">Uploads</div>
                    <div id="channel-home-videos">
                        {videos}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelHome;