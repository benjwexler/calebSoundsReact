// import ReactOnRails from 'react-on-rails';
import React, { Component } from 'react';
// import SoundCloudWidget from 'react-simple-soundcloud-widget'

import CustomSoundcloud from './CustomSoundcloud.jsx';

class Section2 extends React.Component {

    constructor(props) {
        super(props);

     

        this.state = {
            tracks: undefined,
            tracksObj: undefined,
            currentTrackPlaying: undefined, 
            counter: 0,
            isTrackPlaying: false
        }
    }

    playOrPauseTrack = (e) => {

        let trackNumber = e.target.dataset.trackNumber

        let isTrackPlaying
       

 
        // console.log(document.getElementById(`sc-widget${trackNumber}`))
        let newTracksObj = {...this.state.tracksObj}

        newTracksObj[trackNumber].isPlaying = !newTracksObj[trackNumber].isPlaying


        if(this.state.currentTrackPlaying == trackNumber) {
            window[`widget${trackNumber}`].toggle()
            console.log("pausing")
            // trackNumber = undefined 
            isTrackPlaying = !this.state.isTrackPlaying
        } else {
            console.log("playing")
            window[`widget${trackNumber}`].seekTo(0)
            window[`widget${trackNumber}`].play()
            isTrackPlaying = true
        }

        this.setState({
            tracksObj: newTracksObj,
            currentTrackPlaying: trackNumber,
            isTrackPlaying: isTrackPlaying
            })
      }

      componentDidUpdate() {
        console.log("updated!")
        let soundcloudWidget
        let that = this 
        if(this.state.counter === 7) {
            console.log(document.getElementById("playAndPauseIcon1"))

            let tracks = document.querySelectorAll('.playAndPauseIcon');
            let soundclouds = document.querySelectorAll('.soundclouds')

            console.log(soundclouds)

            for(let i=0; i<soundclouds.length; i++) {
                console.log(soundclouds[i].id)
                soundcloudWidget  = soundclouds[i]
  window[`widget${i}`] = SC.Widget(soundcloudWidget);
  console.log(soundcloudWidget)

  window[`widget${i}`].bind(SC.Widget.Events.READY, function () {



});
            }
            that.setState({
                counter: 6
                })

        }
      }

    componentDidMount() {
        let that = this 
        let soundcloudWidget

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
                tracksObj: newTracksObj,
                counter: 7
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
        let isTrackPlaying = this.state.isTrackPlaying
        let that = this
        
        if(tracksObj !== undefined) {
        
            tracks = (
                <div id="mainContainer">
                    <div className="cardsContainer">
                    {tracks.map(function(track, index){

                        
                       
                    return (
                        <div>
                        
                       

      

                        <div className="card" key={ index }>
                            <div onClick={(e) => that.playOrPauseTrack(e)} className="playIcon">
                            {(currentTrackPlaying != index || !isTrackPlaying) &&
                                <i  data-track-number={index} id={"playAndPauseIcon" + (index+1)} className="fas fa-3x playAndPauseIcon fa-play"></i>
                            }
                            {((currentTrackPlaying == index) && isTrackPlaying) &&
                                <i data-track-number={index} id={"playAndPauseIcon" + (index)} className="fas fa-3x playAndPauseIcon fa-pause"></i>
                            }
                            </div>
                            <h5 className="card-title">{track.name}</h5>
                            <img class="card-img-top" src={track.image} alt="Card image cap"/>
                        <div className="card-body">
                            <p className="card-text">Released: {track.release_date}</p>
                        </div>
                        </div>
                        <iframe  className="soundclouds" id={"sc-widget" + index} src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + track.soundcloud_id + "&visual=true"}></iframe>
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