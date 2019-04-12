import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import FullScreen from "./FullScreen.js";
import Container from "./Container.js";
import Footer from "./Footer.js";

class EditTrack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      railsToken: ReactOnRails.authenticityToken(),
      showMobileNav: false,
      totalPrice: undefined,
      errorMessage: undefined,
      coverArt: undefined,
      "track[name]": props.trackName,
      "track[soundcloud_id]": props.soundcloudId,
    //   soundcloudEmbedCode: props.soundcloudId,
    //   "track[spotify_url]": props.spotifyURL,  
    //   "track[youtube_url]": props.youtubeURL, 
    //   "track[apple_music_url]": props.apple_musicURL, 
    //   "track[soundcloud_url]": props.soundcloudURL, 
    //   trackId: props.trackId
    };

    this.handleImgUpload = this.handleImgUpload.bind(this)
    this.handleSoundcloudEmbed = this.handleSoundcloudEmbed.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this);
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

  validateAndUpload = fileInput => {
    console.log(fileInput);
  };

  submitForm = event => {
    // event.preventDefault(); 
    console.log(event);

    let trackName = document.getElementById("track_name").value;
    let coverArt = document.getElementById("track_cover_art");
    let soundcloudEmbedCode = document.getElementById("track_soundcloud_id").value;

    soundcloudEmbedCode = soundcloudEmbedCode.split('tracks/')[1]
    soundcloudEmbedCode = soundcloudEmbedCode.split('&')[0]

    let spotifyURL = document.getElementById("track_spotify_url").value;
    let youtubeURL = document.getElementById("track_youtube_url").value;
    let appleMusicURL = document.getElementById("track_apple_music_url").value;
    let soundcloudURL = document.getElementById("track_soundcloud_url").value;

    console.log(trackName);
    console.log(coverArt);
    console.log(soundcloudEmbedCode);
    console.log(spotifyURL);
    console.log(youtubeURL);
    console.log(appleMusicURL);
    console.log(soundcloudURL);

  }

  componentDidMount() {
    let that = this;

    window.addEventListener("resize", this.handleResize);
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

    return (
      <div>
        <Navbar toggleMobileNav={this.toggleMobileNav} />
        <MobileNav
          toggleMobileNav={this.toggleMobileNav}
          mobileNavToggle={mobileNavToggle}
        />
        <FullScreen>
          <Container
            containerHeight={{ height: "auto" }}
            innerHeight={{ height: "auto" }}
            title={this.state["track[name]"]}
          >
     

             

       

          

   

         


       


           
          </Container>
        </FullScreen>
      </div>
    );
  }
}

export default EditTrack;
