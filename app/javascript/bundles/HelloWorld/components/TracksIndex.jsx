import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import ShowTracks from "./ShowTracks.js";
import TrackAdmin from "./TrackAdmin.js";
import Modal from "./Modal.js";
import EditTrackModal from "./EditTrackModal.js";


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
      showModal: false,
      currentEditTrack: undefined,
      editTrackName: undefined,
      "track[name]": undefined,
      "track[spotify_url]": undefined,  
      "track[youtube_url]": undefined, 
      "track[apple_music_url]": undefined, 
      "track[soundcloud_url]": undefined, 
      soundcloudEmbedCode: undefined,
      trackId: undefined, 

    };
    this.handleImgUpload = this.handleImgUpload.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSoundcloudEmbed = this.handleSoundcloudEmbed.bind(this)

  }

  updateTrackReq = e => {
    let that = this;
    e.preventDefault();
    let trackObj = {};
    trackObj.utf8 = "✓";
    trackObj.authenticity_token = that.state.railsToken;
    trackObj["sound[key]"] = that.state.key;
    trackObj["sound[tempo]"] = that.state.tempo;
    trackObj.commit = "Update Sound";
    trackObj["_method"] = "patch";

    var data = new FormData();
    data.append("utf8", "✓");
    data.append("authenticity_token", that.state.railsToken);

    data.append("track[name]", that.state["track[name]"]);
    data.append("track[spotify_url]", that.state["track[spotify_url]"]);
    data.append( "track[youtube_url]", that.state["track[youtube_url]"]);
    data.append("track[apple_music_url]", that.state["track[apple_music_url"]);
    data.append("track[soundcloud_url]", that.state["track[soundcloud_url]"]);
    data.append("track[soundcloud_id]", that.state.soundcloudEmbedCode);


    data.append("commit", "Edit Track");
    data.append("_method", "patch");
    if(that.state.coverArt) {
      data.append("track[cover_art]", that.state.coverArt);
    }
   

    let url = `http://localhost:3000/tracks/${that.state.trackId}`;

    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,

      url: url,
      data: data,
      success: function(json) {
        if (json.errorMessage) {
        } else {
          // document.getElementById("modalButton").click();
          console.log(json);

          that.setState({
            tracks: json
          });
          
        }
      },
      error: function(xhr) {
        console.log("error");
      },
      dataType: "json"
    });
  };

  deleteTrack = (trackIndex) => {
    let that = this;
    console.log(this.state.tracks[trackIndex].id)

    let trackId = this.state.tracks[trackIndex].id;

    // fetch(`/tracks/${trackId}`, {
    //   headers: {
    //     // "Content-Type": "application/json",
    //     "X-CSRF-Token": this.state.railsToken
    //   },
    //   method: 'DELETE',
    //   // data: {"_method":"delete"},
    //   // credentials: "same-origin",
    // })
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(myJson) {
    //     console.log(myJson)
    //   })

    $.ajax({
      type: "POST",
      url: `/tracks/${trackId}`,
      data: { _method: "delete", authenticity_token: that.state.railsToken },
      success: function(json) {
        console.log("trying to delete");
        console.log(json);
        that.setState(
          {
            tracks: json,
            counter: 7

          },
          that.bindWidget
        );
      },
      error: function(xhr) {},
      dataType: "json"
    });
  }

  toggleModal = (trackIndex) => {

    
    let trackName;
    let spotify_url;
    let youtube_url;
    let apple_music_url;
    let soundcloud_url;
    let soundcloudEmbedCode;
    let trackId;
    if(this.state.tracks[trackIndex]) {
     trackName = this.state.tracks[trackIndex].name
     spotify_url = this.state.tracks[trackIndex].spotify_url
     youtube_url = this.state.tracks[trackIndex].youtube_url
     apple_music_url = this.state.tracks[trackIndex].apple_music_url
     soundcloud_url = this.state.tracks[trackIndex].soundcloud_url
     soundcloudEmbedCode = this.state.tracks[trackIndex].soundcloud_id
     trackId = this.state.tracks[trackIndex].id
    }
    
    console.log(trackName)
    this.setState({
      showModal: !this.state.showModal,
      currentEditTrack: trackName,
      "track[name]": trackName,
      "track[spotify_url]": spotify_url,
      "track[youtube_url]": youtube_url,
      "track[apple_music_url]": apple_music_url,
      "track[soundcloud_url]": soundcloud_url,
      soundcloudEmbedCode: soundcloudEmbedCode,
      trackId: trackId,

    });
  };


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

  handleImgUpload = (event) => {
    this.setState({
      coverArt: URL.createObjectURL(event.target.files[0])
    })
  }

  handleSoundcloudEmbed = (event) => {

    console.log("Trying to change SC")

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

  formatDate = (inputDate) => {
    var date = new Date(inputDate);
    const year = date.getFullYear().toString().slice(-2);

    if (!isNaN(date.getTime())) {
        var day = date.getDate().toString();
        var month = (date.getMonth() + 1).toString();
        // Months use 0 index.

        return (month[1] ? month : '0' + month[0]) + '/' +
           (day[1] ? day : '0' + day[0]) + '/' + 
           year
    }
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
        releaseDate={this.formatDate(that.state.tracks[i].release_date)}
        editTrack={() => this.toggleModal(i)}
        deleteTrack={() => this.deleteTrack(i)}
        trackInfo={track}
        onChange={this.handleFormChange}
        />)
    }))

    let modal;

    let loginInSwitch = "inactiveBtn";
    let signUpSwitch = "switchFormBtn";

    if (this.state.showModal) {
      modal = (
        <EditTrackModal
          exitModal={this.toggleModal}
          loginInSwitch={loginInSwitch}
          railsToken={this.state.railsToken}
          name={this.state.currentEditTrack}
          trackName={this.state["track[name]"]}
          spotifyLink={this.state["track[spotify_url]"]}
          youtubeLink={this.state["track[youtube_url]"]}
          appleMusicLink={this.state["track[apple_music_url]"]}
          soundcloudLink={this.state["track[soundcloud_url]"]}
          soundcloudEmbedCode={this.state.soundcloudEmbedCode}
          onChange={this.handleFormChange}
          handleSoundcloudEmbed={this.handleSoundcloudEmbed}
          handleImgUpload={this.handleImgUpload}
          submit={this.updateTrackReq}
        />
      );
    }







    return (
      <div>
      {modal}
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