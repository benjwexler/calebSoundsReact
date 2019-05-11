import ReactOnRails from "react-on-rails";
import React, { Component } from "react";
import Navbar from "./Navbar.js";
import MobileNav from "./MobileNav.js";
import FullScreen from "./FullScreen.js";
import Container from "./Container.js";
import Footer from "./Footer.js";

class KitNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      railsToken: ReactOnRails.authenticityToken(),
      showMobileNav: false,
      totalPrice: undefined,
      errorMessage: undefined,
      coverArt: undefined,
      soundcloudEmbedCode: undefined  
    };

    this.handleImgUpload = this.handleImgUpload.bind(this)
    this.handleSoundcloudEmbed = this.handleSoundcloudEmbed.bind(this)
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


    var formData = new FormData();

    // formData.append("username", "Groucho");
    // formData.append("accountnum", 123456); // number 123456 is immediately converted to a string "123456"
    
    // // HTML file input, chosen by user
    // formData.append("userfile", fileInputElement.files[0]);
    
    // // JavaScript file-like object
    // var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
    // var blob = new Blob([content], { type: "text/xml"});
    
    // formData.append("webmasterfile", blob);
    
    // var request = new XMLHttpRequest();
    // request.open("POST", "http://foo.com/submitform.php");
    // request.send(formData);



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
            title="New Kit"
          >
            <form
              onSubmit={event => this.submitForm(event)}
              className="edit_user"
              id="trackForm"
              action="/kits"
              accept-charset="UTF-8"
              method="post"
              enctype="multipart/form-data"
            >
              <input name="utf8" type="hidden" value="✓" />
              <input
                type="hidden"
                name="authenticity_token"
                value={this.state.railsToken}
              />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    type="text"
                    name="kit[name]"
                    id="kit_name"
                    placeholder="Kit Name"
                  />
                  <i className="fas fa-info-circle modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={Object.assign(
                      { paddingTop: "10px", height: "30px" },
                      emailInputStyle
                    )}
                    // onChange={this.handleImgUpload}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    accept="image/*"
                    type="file"
                    name="kit[cover_art]"
                    id="kit_cover_art"
                    placeholder="Cover Art"
                  
                  />
                  <i className="far fa-image modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={Object.assign(
                      { paddingTop: "10px", height: "30px" },
                      emailInputStyle
                    )}
                    onChange={this.handleImgUpload}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    accept="audio/*"
                    type="file"
                    name="kit[folder][]"
                    id="kit_folder"
                    placeholder="Sounds"
                    multiple="multiple"
                  
                  />
                  <i className="far fa-file-audio modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <textarea
                    onChange={this.handleSoundcloudEmbed}
                    // value={this.state.soundcloudEmbedCode}
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="description"
                    type="text"
                    name="kit[description]"
                    id="kit_description"
                    placeholder="Description"
                    style={{paddingTop:'25px', height: '100px'}}
                  ></textarea>
                  <i style={{top:'25%'}} className="fas fa-info-circle modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="price"
                    type="text"
                    name="kit[price]"
                    id="kit_price"
                    placeholder="Price"
                  />
                  <i className="fas fa-dollar-sign  modalIcon" />
                </div>
              </div>
              <br />

            

              <div
                style={{ textAlign: "center", marginBottom: "15px" }}
                class="actions"
              >
                <input
                  style={{ fontSize: "16px", width: "auto" }}
                  className="btn"
                  type="submit"
                  name="commit"
                  value="Create Kit"
                  data-disable-with="Create Kit"
                  // disabled='disabled'
                />
              </div>
            </form>
          </Container>
        </FullScreen>
      </div>
    );
  }
}

export default KitNew;
