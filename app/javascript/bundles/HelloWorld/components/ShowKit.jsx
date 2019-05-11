import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import FullScreen from "./FullScreen.js";
import Container from "./Container.js";
import Footer from "./Footer.js";
import Sample from "./Sample.js";
import ShowSamples from "./ShowSamples.js";
import ModalNewSound from "./ModalNewSound.js";

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
      kitName: props.kitName,
      kitSounds: [],
      currentSample: undefined,
      sampleCurrentlyPlaying: false,
      newSrc: undefined,
      showModal: false,
      'sound[name]': '',
      'sound[tempo]': '',
      'sound[key]': '',
      'sound[soundfile]': '',

    };

    this.handleFormChange = this.handleFormChange.bind(this);

  }

  loadSounds = kitId => {
    // this.setState({ in: false });
    let that = this;
    let kitSounds;
    let padsObj = {};


var pathArray = window.location.pathname.split('/');

var kitId = pathArray[pathArray.length-1]

console.log(kitId)

    fetch(`/kits/${kitId}`, {
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

  handleFileUpload = (ev) => {
    // console.log(ev.target.value.files[0]);
    console.log(ev.target.files[0])
    const soundFile = ev.target.files[0];

    this.setState({
      'sound[soundfile]': soundFile
    });
  };

  handleSubmit = e => {

    this.setState({
      showModal: false,
    });
    let that = this;
    e.preventDefault();


    

    var data = new FormData();
    data.append("utf8", "✓");
    data.append("authenticity_token", that.state.railsToken);

    data.append("sound[name]", that.state["sound[name]"]);
    data.append("sound[tempo]", that.state["sound[tempo]"]);
    data.append("sound[key]", that.state["sound[key]"]);
    data.append("sound[kit_id]", that.state.kitId);
    
    


    data.append("commit", "New Sound");
    // data.append("_method", "patch");
    if(that.state["sound[soundfile]"]) {
      data.append("sound[soundfile]", that.state["sound[soundfile]"], that.state["sound[soundfile]"]);
    }
   

    let url = `/sounds`;

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

  toggleModal = () => {
        this.setState({
          showModal: !this.state.showModal,
    
        });
      };

  
  

  render() {
    let that = this;

    let modal

    if (this.state.showModal) {
      modal = (
        <ModalNewSound
        exitModal={this.toggleModal}
        submit={this.handleSubmit}
        name={this.state['sound[name]']}
        musicalKey={this.state['sound[key]']}
        tempo={this.state['sound[tempo]']}
        onChange={this.handleFormChange}
        kitName={this.state.kitName}
        handleFileUpload={this.handleFileUpload}
        />
      );

    }


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
      {modal}
        <Navbar toggleMobileNav={this.toggleMobileNav} />
        <MobileNav
          toggleMobileNav={this.toggleMobileNav}
          mobileNavToggle={mobileNavToggle}
        />
        <ShowSamples
            samples={samples}
            openModal={this.toggleModal}
            
            
        />
        {audioPlayer}
   
      </div>
    );
  }
}

export default ShowKit;