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





  componentDidMount() {
    let that = this;

    window.addEventListener("resize", this.handleResize);

    this.loadSounds(this.state.kitId)
  }

  render() {
    let that = this;
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
            sampleCurrentlyPlaying={this.state.sampleCurrentlyPlaying}
            inProp={this.state.transition && i >= this.state.sampleOffset - 6}
            key={i}
            delay={i * 70}
            adminView={true}
            id={this.state.kitSounds[i].id}
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
   
      </div>
    );
  }
}

export default ShowKit;