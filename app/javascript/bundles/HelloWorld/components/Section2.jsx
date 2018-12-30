// import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';

class Section2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tracks: undefined,
            tracksObj: undefined,
            currentTrackPlaying: undefined, 
        }
    }

    playOrPauseTrack = (e) => {
        console.log(e.target.dataset.trackNumber)
        let trackNumber = e.target.dataset.trackNumber
        let newTracksObj = {...this.state.tracksObj}

        newTracksObj[trackNumber].isPlaying = !newTracksObj[trackNumber].isPlaying


        if(this.state.currentTrackPlaying == trackNumber) {
            trackNumber = undefined 
        }

        this.setState({
            tracksObj: newTracksObj,
            currentTrackPlaying: trackNumber
            })
      }

    componentDidMount() {
        let that = this 

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/tracks?limit=4",
            success: function(json){
            //    console.log(json)s
            let newTracksObj = {}
               json.forEach(function(track, index){
                   console.log(json[index])
                   newTracksObj[index] = json[index]

               })
               that.setState({
                tracks: json,
                tracksObj: newTracksObj
                })
            },
            error: function(xhr) { 
            }, 
            dataType: "json"
          });
      }

    render() {
        let tracks = this.state.tracks
        let tracksObj = this.state.tracksObj
        let currentTrackPlaying = this.state.currentTrackPlaying
        let that = this
        if(tracksObj !== undefined) {
        
            tracks = (
                <div id="mainContainer">
                    <div className="cardsContainer">
                    {tracks.map(function(track, index){
                    return (
                        <div className="card" key={ index }>
                            <div onClick={(e) => that.playOrPauseTrack(e)} className="playIcon">
                            {currentTrackPlaying != index &&
                                <i  data-track-number={index} id={"playAndPauseIcon" + (index+1)} className="fas fa-3x playAndPauseIcon fa-play"></i>
                            }
                            {currentTrackPlaying == index &&
                                <i data-track-number={index} id={"playAndPauseIcon" + (index)} className="fas fa-3x playAndPauseIcon fa-pause"></i>
                            }
                            </div>
                            <h5 className="card-title">{track.name}</h5>
                            <img class="card-img-top" src={track.image} alt="Card image cap"/>
                        <div className="card-body">
                            <p className="card-text">Released: {track.release_date}</p>
                        </div>
                        </div>
                        );
                    }
                    )}
                    </div>
                </div> 
            )
        }

        return (
            <div id="section2">
                <div id="section2title">Latest Releases </div>
                {tracks}
            </div>
        )
    }

};

export default Section2;