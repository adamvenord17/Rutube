import React from 'react';
import SubscriptionItemContainer from "./subscription_item_container";

class ChannelHome extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let subscriptions = this.props.channelOwner.subscriptionIds.map(subId => {
            return <SubscriptionItemContainer key={subId} creatorId={subId}/>
        })

        return(
            <div id="channel-view-container">
                <div id="channel-home-container">
                    <div className="channel-view-title">Subscriptions</div>
                    <div id="channel-home-subscriptions">
                        {subscriptions}
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelHome;