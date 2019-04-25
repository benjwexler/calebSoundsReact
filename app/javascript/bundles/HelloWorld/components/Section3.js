import React from 'react';


const section3 = (props) => {

    return (
        <div id="section3">
        <div id="fauxSection3"></div>
            <div id="latestTracksHeader">Latest Tracks</div>
            <div id="tracksContainer">

            {props.tracks}

            </div>
        </div>
    )
};

export default section3;