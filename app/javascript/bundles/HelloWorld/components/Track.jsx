import React, { Component } from "react";
import { Waypoint } from 'react-waypoint';



class Track extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 

            className: undefined 
        }
    }

    enterWaypoint = (props) => {

        this.setState({ 
            className: "flipDown" 
        });
        console.log("enterWayPoint")
        console.log(props)
      }
    
      exitWaypoint = (props) => {

        // this.setState({ 
        //     className: "flipUp"
        // });
        console.log("exitWayPoint")
        console.log(props)
      }

    render() {

       


     

// }
// const track = (props) => {

   

    let icon = <i onClick={this.props.playPauseTrack}  className={"fas fa-play trackPlayIcon" + " " + this.props.currentHoverPlayIcon}></i>

    if(this.props.currentTrack && this.props.currentlyPlaying) {
        icon = <i onClick={this.props.playPauseTrack}  className={"fas fa-pause trackPauseIcon" + " " + this.props.currentHoverPlayIcon}></i>
    }

    

    

    

    return (
 <Waypoint onEnter={() => this.enterWaypoint()} onLeave={() => this.exitWaypoint()}>
        <div className={"track" + " " + this.props.lastTwoTracks + " " + this.state.className}>
                <div data-track-number={this.props.trackNumber} onMouseOver={this.props.showCircle} onMouseOut={this.props.hideCircle} className="trackImageContainer">
                    <img  className="trackImage" src={this.props.image}/>
                    <div onClick={this.props.playPauseTrack} className={"trackCircle" + " " + this.props.currentHoverTrack}></div>
                    {icon}
                </div>
                <div className="trackInfoContainer">
                    <div className="trackNameContainer">
                        <div className="trackName">{this.props.name} </div>
                    </div>
                    <div className="streamContainer">
                        <div style={{borderLeft: "1px"}} className="logoContainer">
                            <a className={this.props.spotifyNoStreaming} href={this.props.spotifyLink} target="_blank">
                                <i className="fab streamingLogo  fa-spotify"></i>
                            </a>
                        </div>
                        <div style={{borderRight: "0px"}} className="logoContainer">
                            <a className={this.props.soundcloudNoStreaming} href={this.props.soundcloudLink} target="_blank">
                                <i className="fab streamingLogo  fa-soundcloud"></i>
                            </a>
                        </div>
                        <div style={{borderLeft: "1px", borderBottom: "0px"}} className="logoContainer">
                            <a className={this.props.appleMusicNoStreaming} href={this.props.appleMusicLink} target="_blank">
                                <i className="fab streamingLogo  fa-apple"></i>
                            </a>
                        </div>
                        
                        <div style={{borderRight: "0px", borderBottom: "0px"}}className="logoContainer">
                            <a className={this.props.youtubeNoStreaming} href={this.props.youtubeLink} target="_blank">
                                <i className="fab streamingLogo  fa-youtube"></i>
                            </a>
                        </div>

                    </div>

                </div>

                 <iframe  className="soundclouds" id={"sc-widget" + "index"} allow="autoplay"  src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + this.props.soundcloud_id + "&visual=true"}></iframe>
            </div>

            </Waypoint>

    )
};
}
export default Track;