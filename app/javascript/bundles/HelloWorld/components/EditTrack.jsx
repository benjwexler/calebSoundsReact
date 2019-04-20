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
    //   "track[soundcloud_id]": props.soundcloudId,
      soundcloudEmbedCode: props.soundcloudId,
      "track[spotify_url]": props.spotifyURL,  
      "track[youtube_url]": props.youtubeURL, 
      "track[apple_music_url]": props.apple_musicURL, 
      "track[soundcloud_url]": props.soundcloudURL, 
      trackId: props.trackId
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
            title="Edit Track"
          >
            <form
              onSubmit={event => this.submitForm(event)}
              className="edit_user"
              id="trackForm"
              action={"/tracks/" + this.state.trackId}
              accept-charset="UTF-8"
              method="post"
              enctype="multipart/form-data"
            >
              <input name="utf8" type="hidden" value="✓" />
              <input type="hidden" name="_method" value="patch"/>
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
                    name="track[name]"
                    id="track_name"
                    placeholder="Track Name"
                    value={this.state["track[name]"]}
                    onChange={this.handleFormChange}
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
                    onChange={this.handleImgUpload}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    accept="image/*"
                    type="file"
                    name="track[cover_art]"
                    id="track_cover_art"
                    placeholder="Cover Art"
                    
                  
                  />
                  <i className="far fa-image modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    onChange={this.handleSoundcloudEmbed}
                    value={this.state.soundcloudEmbedCode}
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    type="text"
                    name="track[soundcloud_id]"
                    id="track_soundcloud_id"
                    placeholder="Soundcloud Embed Code"
                  />
                  <i className="fab fa-soundcloud modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    type="text"
                    name="track[spotify_url]"
                    id="track_spotify_url"
                    placeholder="Spotify URL"
                    value={this.state["track[spotify_url]"]}
                    onChange={this.handleFormChange}
                  />
                  <i className="fab fa-spotify  modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    type="text"
                    name="track[youtube_url]"
                    id="track_youtube_url"
                    placeholder="Youtube URL"
                    value={this.state["track[youtube_url]"]}
                    onChange={this.handleFormChange}
                  />
                  <i className="fab fa-youtube modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    type="text"
                    name="track[apple_music_url]"
                    id="track_apple_music_url"
                    placeholder="Apple Music URL"
                    value={this.state["track[apple_music_url]"]}
                    onChange={this.handleFormChange}
                  />
                  <i className="fab fa-apple modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <div className="modalIconContainer">
                  <input
                    style={emailInputStyle}
                    className="form"
                    autoFocus="autofocus"
                    autocomplete="email"
                    type="text"
                    name="track[soundcloud_url]"
                    id="track_soundcloud_url"
                    placeholder="Soundcloud URL"
                    value={this.state["track[soundcloud_url]"]}
                    onChange={this.handleFormChange}
                  />
                  <i className="fab fa-soundcloud modalIcon" />
                </div>
              </div>
              <br />

              <div class="field">
                <label for="track_release_date">Release date</label>
                <br />
                <select
                  id="track_release_date_1i"
                  name="track[release_date(1i)]"
                >
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019" selected="selected">
                    2019
                  </option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
                <select
                  id="track_release_date_2i"
                  name="track[release_date(2i)]"
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3" selected="selected">
                    March
                  </option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select
                  id="track_release_date_3i"
                  name="track[release_date(3i)]"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26" selected="selected">
                    26
                  </option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
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
                  value="Create Track"
                  data-disable-with="Create Track"
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

export default EditTrack;
