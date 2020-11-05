import React from 'react';
import SubscriptionItemContainer from "./subscription_item_container";
import VideoIndexItem from "../../videos/video_index_item_container";
class ChannelHome extends React.Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount() {
    //     this.props.fetchUserVideos(this.props.channelOwnerId);
    // }

    render() {

        let subscriptions = this.props.channelOwner.subscriptionIds.map(subId => {
            return <SubscriptionItemContainer key={subId} creatorId={subId}/>
        })

        let videos = Object.values(this.props.videos).map((video) => {
            return <div key={video.id} className="video-item"><VideoIndexItem video={video} /></div>
        })

        if (subscriptions.length === 0) {
            subscriptions = <div style={{marginLeft: '20px', marginTop: '20px'}}>No Subscriptions yet. Go out and subscribe to some users!</div>
        }

        if (videos.length === 0) {
            videos = <div style={{marginLeft: '20px'}}>Your uploaded videos will appear here. It doesn't look like you have uploaded any videos yet!</div>
        }

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