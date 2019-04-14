import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import ShowTracks from "./ShowTracks.js";
import TrackAdmin from "./TrackAdmin.js";


class TracksIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      railsToken: ReactOnRails.authenticityToken(),
      showMobileNav: false,
      totalPrice: undefined,
      errorMessage: undefined,
      coverArt: undefined,
      newSrc: undefined,
      tracks: [],
      currentTrack: undefined,

    };

  }






  edit = (e) => {
    console.log("hey")
   console.log(e.currentTarget.dataset.sampleNumber);

  }

  toggleMobileNav = () => {
    let that = this;
    this.setState({
      showMobileNav: !that.state.showMobileNav
    });
  };

  handleFormChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleImgUpload = (event) => {
    this.setState({
      coverArt: URL.createObjectURL(event.target.files[0])
    })
  }

  handleSoundcloudEmbed = (event) => {

    let soundcloudEmbedCode=event.target.value

    try {
      soundcloudEmbedCode = soundcloudEmbedCode.split('tracks/')[1]
      soundcloudEmbedCode = soundcloudEmbedCode.split('&')[0]
    }
    catch(error) {
      soundcloudEmbedCode = event.target.value
    }

    

    // console.log(event.target.value)

    this.setState({
      soundcloudEmbedCode: soundcloudEmbedCode
    })

  }

  handleResize = () => {
    if (window.innerWidth > 1120) {
      this.setState({
        showMobileNav: false
      });
    } else {
      this.setState({
        showAccountDropdown: false
      });
    }
  };

  setCurrentTrack = e => {
    let currentTrack = parseInt(e.currentTarget.parentNode.dataset.trackNumber);
    console.log(`Current Track:`,  e.currentTarget.parentNode.dataset)
    let currentlyPlaying = true;

    if (
      this.state.currentlyPlaying &&
      this.state.currentTrack === currentTrack
    ) {
      currentlyPlaying = false;
    }

    this.setState(
      {
        currentTrack: currentTrack,
        currentlyPlaying: currentlyPlaying
      },
      this.playPauseTrack(currentTrack)
    );
  };

  playPauseTrack = currentTrack => {


    if (this.state.currentTrack === currentTrack) {
      window[`widget${currentTrack}`].toggle();

    } else {

      window[`widget${currentTrack}`].seekTo(0);
      window[`widget${currentTrack}`].play();

    }
  };

  bindWidget = () => {
    let soundcloudWidget;
    let that = this;
    if (this.state.counter === 7) {

      let tracks = document.querySelectorAll(".playAndPauseIcon");
      let soundclouds = document.querySelectorAll(".soundclouds");

      for (let i = 0; i < soundclouds.length; i++) {

        soundcloudWidget = soundclouds[i];
        window[`widget${i}`] = SC.Widget(soundcloudWidget);
        console.log(window[`widget${i}`].Events);
        window[`widget${i}`].bind(SC.Widget.Events.READY, function() {});
        window[`widget${i}`].bind(SC.Widget.Events.FINISH, function() {
          console.log("Song is finished!");
          that.setState({
            currentlyPlaying: false
          });
        });
      }
    }
  };





  componentDidMount() {
    let that = this;

    window.addEventListener("resize", this.handleResize);

    fetch(`/tracks.json`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
            console.log(myJson)
          that.setState(
            {
              tracks: myJson,
              counter: 7

            },
            that.bindWidget
          );
        });

  }

  render() {
    let that = this;



    let mobileNavToggle = "hideMobileNav";

    if (this.state.showMobileNav) {
      mobileNavToggle = "showMobileNav";
    }


    const tracks = (that.state.tracks.map((track, i) => {
      let currentTrack=false;
      if (i === that.state.currentTrack) {
        currentTrack = true;
      };
        let oddRow;
        if (i % 2 === 1) {
            oddRow = "oddRow";
          } ;
        
        return (<TrackAdmin 
        bgImage={{background: `url(${track.image}) center center / cover no-repeat`}} 
        name={track.name}
        soundcloudLink={track.soundcloud_url}
        spotifyLink={track.spotify_url}
        youtubeLink={track.youtube_url}
        appleMusicLink={track.apple_music_url}
        key={i}
        oddRow={oddRow}
        soundcloud_id={that.state.tracks[i].soundcloud_id}
        playPauseTrack={this.setCurrentTrack}
        trackNumber={i}
        currentTrack={currentTrack}
        currentlyPlaying={this.state.currentlyPlaying}
        />)
    }))







    return (
      <div>
        <Navbar toggleMobileNav={this.toggleMobileNav} />
        <MobileNav
          toggleMobileNav={this.toggleMobileNav}
          mobileNavToggle={mobileNavToggle}
        />

        <ShowTracks tracks={tracks}/>
        
      </div>
    );
  }
}

export default TracksIndex;