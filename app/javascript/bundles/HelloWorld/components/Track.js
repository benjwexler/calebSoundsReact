import React from 'react';


const track = (props) => {

    return (
        <div className="track">
                <div className="trackImageContainer">
                    <img className="trackImage" src="pics/coolItCoverArt.jpg"/>
                    <div className="trackCircle"></div>
                    <i className="fas fa-play trackPlayIcon"></i>
                </div>
                <div className="trackInfoContainer">
                    <div className="trackNameContainer">
                        <div className="trackName">Cool it Pt. 2 </div>
                    </div>
                    <div className="streamContainer">
                        <div className="logoContainer">
                            <i className="fab streamingLogo  fa-spotify"></i>
                        </div>
                        <div className="logoContainer">
                            <i className="fab streamingLogo  fa-soundcloud"></i>
                        </div>
                        <div className="logoContainer">
                            <i className="fab streamingLogo  fa-apple"></i>
                        </div>
                        <div className="logoContainer">
                            <i className="fab streamingLogo  fa-youtube"></i>
                        </div>

                    </div>

                </div>
            </div>
    )
};

export default track;