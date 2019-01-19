import React from 'react';


const track = (props) => {

    return (
        <div className="track">
                <div data-track-number={props.trackNumber} onMouseOver={props.showCircle} onMouseOut={props.hideCircle} className="trackImageContainer">
                    <img  className="trackImage" src={props.image}/>
                    <div className={"trackCircle" + " " + props.currentHoverTrack}></div>
                    <i className={"fas fa-play trackPlayIcon" + " " + props.currentHoverPlayIcon}></i>
                </div>
                <div className="trackInfoContainer">
                    <div className="trackNameContainer">
                        <div className="trackName">{props.name} </div>
                    </div>
                    <div className="streamContainer">
                        <div className="logoContainer">
                            <a class={props.spotifyNoStreaming} href={props.spotifyLink}>
                                <i className="fab streamingLogo  fa-spotify"></i>
                            </a>
                        </div>
                        <div className="logoContainer">
                            <a class={props.soundcloudNoStreaming} href={props.soundcloudLink}>
                                <i className="fab streamingLogo  fa-soundcloud"></i>
                            </a>
                        </div>
                        <div className="logoContainer">
                            <a href={props.appleMusicLink}>
                                <i className="fab streamingLogo  fa-apple"></i>
                            </a>
                        </div>
                        
                        <div className="logoContainer">
                            <a class={props.youtubeNoStreaming} href={props.youtubeLink}>
                                <i className="fab streamingLogo  fa-youtube"></i>
                            </a>
                        </div>

                    </div>

                </div>
            </div>
    )
};

export default track;