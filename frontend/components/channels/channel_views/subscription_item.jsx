import React from "react";
import { Link } from 'react-router-dom';

class SubscriptionItem extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (!this.props.creator) {
            this.props.fetchUser(this.props.creatorId)
        }
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

    handleUnsubscribe() {
        this.props.unsubscribeTo(this.props.creatorId, this.props.currentUserId);
    }

    render() {
        if (this.props.creator) {

            let creator = this.props.creator;
            let iconColor = this.intToRGB(this.hashCode(creator.username))
            let iconStyle = {
                backgroundColor: `#${iconColor}`
            };
            let channelLink = `/api/channels/${creator.id}/home`

             // sets up blurb for subscriber count
            let subCount = creator.subscriberCount;
            let subBlurb = 'No Subscribers'
            if (subCount === 1) {
                subBlurb = '1 subscriber'
            } else if (subCount > 1) {
                subBlurb = `${subCount} subscribers`
            }

            return(
                <div id="subscription-item-container">
                    <Link to={channelLink} className="uploader-icon" style={iconStyle}>
                            {creator.username[0].toUpperCase()}
                    </Link>
                    <div id="subscription-name">{creator.username}</div>
                    <div id="subscription-count">{subBlurb}</div>
                    <button onClick={this.handleUnsubscribe} id="unsubscribe-btn">SUBSCRIBED</button>
                </div>
            )
        } else {
            return <div id="subscription-item-container">loading!</div>
        }
    }
}

export default SubscriptionItem;