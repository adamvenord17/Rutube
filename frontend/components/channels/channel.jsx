import React from "react";
import NavBarContainer from "../nav_bar/nav_bar_container"
import SideBarContainer from "../side_bar/side_bar_container";
import SmallSideBar from "../side_bar/small_side_bar";

class Channel extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return(
            <>
                    <NavBarContainer />
                    <main className="row">
                        <SideBarContainer />
                        <SmallSideBar />
                        <section id="channel-container" className="extend">
                            this is the channel
                        </section>
                    </main>
                </>
        )
    }
}

export default Channel