import React from "react";
import DatePicker from "react-datepicker";
import Moment from 'react-moment';

// import "react-datepicker/dist/react-datepicker.css";

const ModalNewSound = props => {
  let emailInputStyle = {
    marginLeft: "auto",
    marginRight: "auto"
  };

  console.log(props.name, props.musicalKey, props.tempo)

  return (
    <div id="modalContainer">
      <div className="wrapper">
     New Sound for {props.kitName}
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
                style={Object.assign(
                  { paddingTop: "10px", height: "30px" },
                  emailInputStyle
                )}
                onChange={props.handleImgUpload}
                className="form"
                autoFocus="autofocus"
                autocomplete="email"
                accept="audio/*"
                type="file"
                name="sound[sound_file]"
                id="sound_soundfile"
                placeholder="Cover Art"
                onChange={props.handleFileUpload}
              />
              <i className="far fa-image modalIcon" />
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
                type="number"
                name="sound[tempo]"
                id="sound_tempo"
                placeholder="BPM"
                value={props.tempo}
                onChange={props.onChange}
              />
              <i className="fas fa-info-circle  modalIcon" />
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
                name="sound[key]"
                id="sound_key"
                placeholder="Key"
                value={props.musicalKey}
                onChange={props.onChange}
              />
              <i className="fas fa-key modalIcon" />
            </div>
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
              value="Add Sound"
              data-disable-with="Create Track"

              // disabled='disabled'
            />
          </div>
         


        </form>
      </div>
    </div>
  );
};

export default ModalNewSound;