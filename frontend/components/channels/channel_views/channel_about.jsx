import React from 'react';

class ChannelAbout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: this.props.channelOwner.username,
            email: this.props.channelOwner.email
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        let user = {
            id: this.props.channelOwner.id,
            username: this.state.username,
            email: this.state.email
        }
        this.props.updateUser(user);
    }

    handleChange(field) {
            return (e) => {
                this.setState({ [field]: e.target.value });
            };
        }

    render() {

        let usernameClass = "input-container username signup";
        let emailClass = "input-container email signup";

        let joinedAt = new Date(this.props.channelOwner.dateJoined).toLocaleString()
        let totalViews = 0;
        Object.values(this.props.videos).forEach(video => {
            totalViews = totalViews + video.numViews
        })

        let formView = "showing"

        let errors = null;
        if (this.props.errors.length > 0) {
            errors = this.props.errors.map(error => {
                return <div id="edit-error">{error}</div>
            })
        }

        if (parseInt(this.props.channelOwnerId) !== this.props.currentUserId) {
            formView = "hiding"
            return(
                <div id="channel-view-container">
                    <div id="channel-about-container">
                        <div id="edit-channel-container" className={formView}>
                        </div>
                        <div id="about-stats-container">
                            <div id="about-stats-title" className="about-stats-stat">Stats</div>
                            <div className="about-stats-stat">Joined {joinedAt}</div>
                            <div className="about-stats-stat">{totalViews} views</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div id="channel-view-container">
                    <div id="channel-about-container">
                        <div id="edit-channel-container" className={formView}>
                            <div id='edit-channel-title'>Update Profile</div>
                            <form>
                                <div className={usernameClass}>
                                    <input
                                        type="text"
                                        onChange={this.handleChange('username')}
                                        value={this.state.username}
                                        required
                                    />
                                    <label>Username</label>
                                </div>
                                <div className={emailClass}>
                                    <input
                                        type="text"
                                        onChange={this.handleChange('email')}
                                        value={this.state.email}
                                        required
                                    />
                                    <label>Email</label>
                                </div>
                                {errors}
                                <button className="edit" onClick={this.handleSubmit}>SAVE UPDATES</button>
                            </form>
                        </div>
                        <div id="about-stats-container">
                            <div id="about-stats-title" className="about-stats-stat">Stats</div>
                            <div className="about-stats-stat">Joined {joinedAt}</div>
                            <div className="about-stats-stat">{totalViews} views</div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ChannelAbout;