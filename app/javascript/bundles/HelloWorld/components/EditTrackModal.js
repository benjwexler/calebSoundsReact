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
          <div className="modalIconContainer">
     <DatePicker
            selected={props.date}
            onChange={props.handleDateChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Release Date"
            />
            <i className="far fa-calendar modalIcon" style={{top: '43%'}}/>
            {/* <i className="fas fa-calendar-week modalIcon" /> */}
            </div>


          <br />
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
         


        </form>
      </div>
    </div>
  );
};

export default EditTrackModal;
