import React from "react";



const EditKitModal = props => {
  let emailInputStyle = {
    marginLeft: "auto",
    marginRight: "auto"
  };

  return (
    <div id="modalContainer">
      <div className="wrapper">
        {props.name}
        <div onClick={props.exitModal} id="exitModal">
          <i id="exitModalIcon" className="far fa-times-circle" />
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
                placeholder="Kit Name"
                value={props.trackName}
                onChange={props.onChange}
              />
              <i className="fas fa-info-circle modalIcon" />
            </div>
          </div>

           <div class="field">
            <div className="modalIconContainer">
              <input
                style={emailInputStyle}
                className="form"
                autoFocus="autofocus"
                autocomplete="email"
                type="number"
                name="track[name]"
                id="track_name"
                placeholder="Price"
                value={props.trackName}
                onChange={props.onChange}
              />
              <i style={{left: '13px'}} className="fas fa-dollar-sign modalIcon" />
            </div>
          </div>

           <div class="field">
            <div className="modalIconContainer">
              <textarea
                style={Object.assign({height: '200px', paddingTop: '10px'}, emailInputStyle)}
                className="form"
                autoFocus="autofocus"
                autocomplete="email"
                type="text"
                name="track[name]"
                id="track_name"
                placeholder="Description"
                value={props.trackName}
                onChange={props.onChange}
                >
              </textarea>
              <i style={{top: '20px'}} className="fas fa-info-circle modalIcon" />
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
              value="Edit Kit Info"
              data-disable-with="Create Kit"

              // disabled='disabled'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKitModal;
