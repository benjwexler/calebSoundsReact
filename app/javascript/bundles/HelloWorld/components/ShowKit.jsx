import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import FullScreen from "./FullScreen.js";
import Container from "./Container.js";
import Footer from "./Footer.js";
import Sample from "./Sample.js";
import ShowSamples from "./ShowSamples.js";

class ShowKit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      railsToken: ReactOnRails.authenticityToken(),
      showMobileNav: false,
      totalPrice: undefined,
      errorMessage: undefined,
      coverArt: undefined,
      kitId: props.kitId,
      kitSounds: [],
      currentSample: undefined,
      sampleCurrentlyPlaying: false,
      newSrc: undefined,

    };

  }

  loadSounds = kitId => {
    // this.setState({ in: false });
    let that = this;
    let kitSounds;
    let padsObj = {};

    fetch(`/kits/${10}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);

        kitSounds = that.state.kitSounds.concat(myJson);
        that.setState(
          {
            kitSounds: kitSounds,
          }
        );
      });
  };

  setSample = (newSrc , e) => {
    console.log(newSrc)
    let sampleNumber = e.currentTarget.dataset.sampleNumber;

    let sampleCurrentlyPlaying = true;


    if (
      this.state.sampleCurrentlyPlaying &&
      this.state.currentSample === parseInt(sampleNumber)
    ) {
      sampleCurrentlyPlaying = false;
    }


    this.setState(
      {
        currentSample: parseInt(sampleNumber),
        sampleCurrentlyPlaying: sampleCurrentlyPlaying,
        newSrc: newSrc
      },
      this.playSample
    );
  };

  playSample = sampleNumber => {
    let audioPlayer = document.getElementById("audioPlayer");


    let audioPlayerState = audioPlayer.readyState;


    if (audioPlayer.paused) {
      audioPlayer.play().then(function() {
        // Automatic playback started!
      });
    } else {
      audioPlayer.pause();
    }

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

  deleteSound2 = (e) => {
    console.log("DELETE TEST");
    console.log(e.currentTarget.dataset.sampleId);
  }

  deleteSound = (e) => {
    let that = this;
    let kitSounds = this.state.kitSounds;

    let soundId = e.currentTarget.dataset.sampleId
    let soundNum = e.currentTarget.dataset.sampleNumber

    console.log(soundNum)
  
    var result = confirm("Want to delete?");
if (result) {
  
  $.ajax({
    type: "POST",
    url: `/sounds/${soundId}`,
    data: { _method: "delete", authenticity_token: that.state.railsToken },
    success: function(json) {
      console.log("trying to delete");
      kitSounds.splice(soundNum, 1)

      // kitSounds = that.state.kitSounds.concat(myJson);
      that.setState({kitSounds: kitSounds});
    },
    error: function(xhr) {},
    dataType: "json"
    });
  }  
}





  componentDidMount() {
    let that = this;

    window.addEventListener("resize", this.handleResize);

    this.loadSounds(this.state.kitId)
  }

  render() {
    let that = this;


    let audioPlayer;
    let currentSampleSrc;
    if (this.state.currentSample || this.state.currentSample === 0) {
      // currentSampleSrc = this.state.kitSounds[this.state.currentSample]
      //   .soundfile;
      
        currentSampleSrc = this.state.newSrc
    }
    audioPlayer = (
      <audio
        onEnded={this.audioEnded}
        id="audioPlayer"
        autoplay
        src={currentSampleSrc}
        type="audio/wav"
      />
    );

    let emailInputStyle = {
      marginLeft: "auto",
      marginRight: "auto"
    };

    let mobileNavToggle = "hideMobileNav";

    if (this.state.showMobileNav) {
      mobileNavToggle = "showMobileNav";
    }

    let samples;
    if (this.state.kitSounds.length > 0) {
      samples = [];
      let oddRow = "";

      let that = this;

      // let currentSample = false;
      for (let i = 0; i < this.state.kitSounds.length; i++) {
        let currentSample = false;
        if (i % 2 === 1) {
          oddRow = "oddRow";
        } else {
          oddRow = "";
        }

        if (i === that.state.currentSample) {
          currentSample = true;
        }

        samples.push(
          <Sample
            oddRow={oddRow}
            name={this.state.kitSounds[i].filename}
            soundfile={this.state.kitSounds[i].soundfile}
            sampleNumber={i}
            playSample={this.setSample}
            currentSample={currentSample}
            tempo={this.state.kitSounds[i].tempo}
            musicalKey={this.state.kitSounds[i].key}
            initialSrc={this.state.kitSounds[i].soundfile}
            sampleCurrentlyPlaying={this.state.sampleCurrentlyPlaying}
            inProp={this.state.transition && i >= this.state.sampleOffset - 6}
            key={this.state.kitSounds[i].id}
            delay={i * 70}
            adminView={true}
            id={this.state.kitSounds[i].id}
            edit={this.edit}
            railsToken={this.state.railsToken}
            deleteSound={this.deleteSound}

          />
        );
      }

      samples = <React.Fragment>{samples}</React.Fragment>;
    }





    return (
      <div>
        <Navbar toggleMobileNav={this.toggleMobileNav} />
        <MobileNav
          toggleMobileNav={this.toggleMobileNav}
          mobileNavToggle={mobileNavToggle}
        />
        <ShowSamples
            samples={samples}
            
        />
        {audioPlayer}
   
      </div>
    );
  }
}

export default ShowKit;