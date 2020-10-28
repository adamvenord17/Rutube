import React from "react";
import NavBarContainer from "../nav_bar/nav_bar_container"
import SideBarContainer from "../side_bar/side_bar_container";
import SmallSideBar from "../side_bar/small_side_bar";
import { Route } from 'react-router-dom';
import ChannelHome from './channel_views/channel_home_container';
import ChannelVideos from './channel_views/channel_videos_container';
import ChannelAbout from './channel_views/channel_about_container';


class Channel extends React.Component {
    constructor(props) {
        super(props);

        this.handleRedirectToLogin = this.handleRedirectToLogin.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleUnsubscribe = this.handleUnsubscribe.bind(this);

        this.handleViewChange = this.handleViewChange.bind(this);
    }

    componentDidMount() {
        if (!this.props.channelOwner) {
            this.props.fetchUser(this.props.channelOwnerId);
            if (this.props.currentUserId && !this.props.users[this.props.currentUserId]) {
                this.props.fetchUser(this.props.currentUserId);
            }
        }
    }

    hashCode(str) {
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

    handleRedirectToLogin() {
        this.props.history.push('/login');
    }

    handleSubscribe() {
        this.props.subscribeTo(this.props.channelOwnerId, this.props.currentUserId);
    }

    handleUnsubscribe() {
        this.props.unsubscribeTo(this.props.channelOwnerId, this.props.currentUserId);
    }

    handleViewChange(field) {
        return () => {
            document.querySelector(".channel-view-tab.selected").classList.remove("selected");
            document.getElementById(`channel-view-tab-${field}`).classList.add("selected");
            this.props.history.replace(`${field}`)
        }
    }

    render() {
        if (this.props.channelOwner) {
            let uploader = this.props.channelOwner;
            let iconColor = this.intToRGB(this.hashCode(uploader.username))
            let iconStyle = {
                backgroundColor: `#${iconColor}`
            };
    
            // sets up blurb for subscriber count
            let subCount = this.props.channelOwner.subscriberCount;
            let subBlurb = 'No Subscribers'
            if (subCount === 1) {
                subBlurb = '1 subscriber'
            } else if (subCount > 1) {
                subBlurb = `${subCount} subscribers`
            }
    
            let titleBtns = '';
            if (parseInt(this.props.channelOwnerId) === this.props.currentUserId) {
                titleBtns = <div id="channel-title-right">
                                <button className="channel-owner-btn">CUSTOMIZE CHANNEL</button>
                                <button className="channel-owner-btn">MANAGE VIDEOS</button>
                            </div>
            } else {
                if (this.props.users[this.props.currentUserId]) {
                    if (this.props.users[this.props.currentUserId].subscriptionIds.includes(this.props.channelOwnerId)) {
                        titleBtns = <div id="channel-title-right">
                                                    <button onClick={this.handleUnsubscribe} id="unsubscribe-btn">SUBSCRIBED</button>
                                                </div>
                    } else {
                        titleBtns = <div id="channel-title-right">
                                                    <button onClick={this.handleSubscribe} id="subscribe-btn">SUBSCRIBE</button>
                                                </div>
                    }
                } else {
                    titleBtns = <div id="channel-title-right">
                                                    <button onClick={this.handleRedirectToLogin} id="subscribe-btn">SUBSCRIBE</button>
                                                </div>
                    }
            }
    
            return(
                <>
                        <NavBarContainer />
                        <main className="row">
                            <SideBarContainer />
                            <SmallSideBar />
                            <section id="channel-container" className="extend">
                                <header>
                                    <div id="channel-title">
                                        <div id="channel-title-left">
                                            <div className="uploader-icon" style={iconStyle}>
                                                {uploader.username[0].toUpperCase()}
                                            </div>
                                            <div id="channel-name-and-btns">
                                                <div id="name-and-subs-count">
                                                    <p id="channel-username">{this.props.channelOwner.username}</p>
                                                    <p id="channel-subs-count">{subBlurb}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {titleBtns}
                                    </div>
                                    <div id="channel-view-tabs-container">
                                        <div className="channel-view-tab selected" id="channel-view-tab-home" onClick={this.handleViewChange("home")}>HOME</div>
                                        <div className="channel-view-tab" id="channel-view-tab-videos" onClick={this.handleViewChange("videos")}>VIDEOS</div>
                                        <div className="channel-view-tab" id="channel-view-tab-about" onClick={this.handleViewChange("about")}>ABOUT</div>
                                    </div>
                                </header>
                                <Route path="/api/channels/:userId/home" component={ChannelHome} />
                                <Route path="/api/channels/:userId/videos" component={ChannelVideos} />
                                <Route path="/api/channels/:userId/about" component={ChannelAbout} />
                            </section>
                        </main>
                    </>
            )
        } else {
            return null
        }
    }
}

export default Channel