import React from "react";
import DatePicker from "react-datepicker";
import Moment from 'react-moment';

// import "react-datepicker/dist/react-datepicker.css";

const EditTrackModal = props => {
  let emailInputStyle = {
    marginLeft: "auto",
    marginRight: "auto"
  };

  return (
    <div id="modalContainer">
      <div className="wrapper">
     {props.name}
      <div onClick={props.exitModal} id="exitModal">
        <i id="exitModalIcon" className="far fa-times-circle"></i>
    </div>
        <form
          onSubmit={event => this.submitForm(event)}
          className="edit_user"
          id="trackForm"
          //   action={"/tracks/" + this.state.trackId}
          accept-charset="UTF-8"
          method="post"
          enctype="multipart/form-data"
        >
          <input name="utf8" type="hidden" value="✓" />
          <input type="hidden" name="_method" value="patch" />
          <input
            type="hidden"
            name="authenticity_token"
            value={props.railsToken}
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
                value={props.trackName}
                onChange={props.onChange}
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
                onChange={props.handleImgUpload}
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
                onChange={props.handleSoundcloudEmbed}
                value={props.soundcloudEmbedCode}
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
                value={props.spotifyLink}
                onChange={props.onChange}
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
                value={props.youtubeLink}
                onChange={props.onChange}
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
                value={props.appleMusicLink}
                onChange={props.onChange}
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
                value={props.soundcloudLink}
                onChange={props.onChange}
              />
              <i className="fab fa-soundcloud modalIcon" />
            </div>
          </div>
          <br />

          <div class="field">
            <label for="track_release_date">Release date</label>
            <br />
            <select onChange={props.onChange} id="track_release_date_1i" name="track[release_date(1i)]">
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
            <select onChange={props.onChange} id="track_release_date_2i" name="track[release_date(2i)]">
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
            <select onChange={props.onChange} id="track_release_date_3i" name="track[release_date(3i)]">
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
              onClick={props.submit}
              style={{ fontSize: "16px", width: "auto" }}
              className="btn"
              type="submit"
              name="commit"
              value="Edit Track"
              data-disable-with="Create Track"
              // disabled='disabled'
            />
          </div>
          <DatePicker
  // selected={new Date()}
  // onChange={props.handleDateChange}
  // dateFormatCalendar={"MMM yyyy"}
  // minDate={subMonths(new Date(), 6)}
  // maxDate={addMonths(new Date(), 6)}
  // showMonthYearDropdown

  selected={props.date}
  onChange={props.handleDateChange}
    peekNextMonth
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
/>


        </form>
      </div>
    </div>
  );
};

export default EditTrackModal;
