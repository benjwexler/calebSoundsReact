import React from "react";
import Transition from "react-transition-group/Transition";

const duration = 0;

const defaultStyle = {
  // transition: `background ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1
  // padding: '10px's
};

const transitionStyles = {
  // entering: { opacity: 0, background: 'lightgreen' },
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

// const sample = (props, { in: inProp}) => {
class sample extends React.Component {
  constructor(props) {
    super(props);
    this.genreRef = React.createRef();
    this.keyRef = React.createRef();
    this.tempoRef = React.createRef();

    this.state = {
      editable: false,
      genre: "Rock",
      railsToken: props.railsToken,
      id: props.id,
      key: props.musicalKey,
      tempo: props.tempo
    };
  }

  updateSampleReq = e => {
    let that = this;
    // e.preventDefault();
    let sampleObj = {};
    sampleObj.utf8 = "✓";
    sampleObj.authenticity_token = that.state.railsToken;
    sampleObj["sound[key]"] = that.state.key;
    sampleObj["sound[tempo]"] = that.state.tempo;
    sampleObj.commit = "Update Sound";
    sampleObj["_method"] = "patch"


    // sampleObj["user[email]"] = document.getElementById("userEmailInput").value;
    // sampleObj["user[password]"] = document.getElementById(
    //   "userPasswordInput"
    // ).value;
    // sampleObj.commit = "Log in";

    let url = `http://localhost:3000/sounds/${that.state.id}`;

    $.ajax({
      type: "POST",

      url: url,
      data: sampleObj,
      success: function(json) {
        if (json.errorMessage) {
       
        } else {
          console.log("signed in or signed up");
          // document.getElementById("modalButton").click();
          console.log(json);
     
        }
      },
      error: function(xhr) {
        console.log("error");
      },
      dataType: "json"
    });
  };

  editSwitch = (bool) => {
    this.setState({
      editable: bool
    });
  };

  handleEditCallback = () => {
    this.editSwitch(false)
    this.updateSampleReq()

  }

  handleEditSave = () => {

    console.log(this.keyRef.current)

    this.setState({
        genre: this.genreRef.current.innerText,
        key: this.keyRef.current.innerText,
        tempo: this.tempoRef.current.innerText,

      }, this.handleEditCallback);

    
  };

  handleEditCancel = () => {
    console.log(this.genreRef.current);
    this.editSwitch(false)  
    this.genreRef.current.innerText = this.state.genre;
    this.keyRef.current.innerText = this.state.key;
    this.tempoRef.current.innerText = this.state.tempo
  };

  trimValue = (ref) => {
    console.log("Stop Editing")
    // console.log(this.genreRef.current)
    str = ref.current.innerText
    str = str.replace(/\s\s+/g, '');
    str.trim();
    this.genreRef.current.innerText = str
  }

  saveContainer = {
    border: '2px solid #23a184',
    borderRadius: '10px',
    padding: '10px',
    color: "#23a184", 
    cursor: "pointer",
    textAlign: 'center',
    margin: 'auto 5px',
    width: '30px',
  }

  cancelContainer = {
    border: '2px solid red',
    borderRadius: '10px',
    padding: '10px',
    color: "red", 
    cursor: "pointer",
    textAlign: 'center',
    margin: 'auto 5px',
    // width: '30px',
  }

  render() {
    let adminView;
    let that = this;
    let editIcon;

    if (!that.state.editable) {
      editIcon = (
        <i
          data-sample-number={this.props.sampleNumber}
          onClick={() => that.editSwitch(true)}
          style={{ marginLeft: "10px", color: "#23a184", cursor: "pointer" }}
          className="far fa-edit"
        >
          {" "}
        </i>
      );
    } else {
      editIcon = (
        <div style={{ display: 'flex', margin: 'auto'}}>
          <div>
            <div onClick={() => that.handleEditSave()} style={that.saveContainer}>
            <div style={{ fontSize: "12px", margin: "auto" }}>Save</div>
              <i
                data-sample-number={this.props.sampleNumber}
                
                style={{
                    margin: "auto",
                 
                  cursor: "pointer"
                }}
                className="far fa-save"
              >
                {" "}
              </i>
              
            </div>
          </div>

           <div>
            <div onClick={() => that.handleEditCancel()} style={that.cancelContainer}>
            <div style={{ fontSize: "12px", margin: "auto" }}>Cancel</div>
              <i
                data-sample-number={this.props.sampleNumber}
                
                style={{
                    margin: "auto",
                 
                  cursor: "pointer"
                }}
                className="far fa-window-close"
              >
                {" "}
              </i>
              
            </div>
          </div>

         
        </div>
      );
    }

    if (this.props.adminView) {
      adminView = (
        <React.Fragment>
          <td>
            {/* <a href={"/sounds/" + this.props.id + "/edit"}> */}
            {editIcon}
            {/* </a> */}
          </td>
          <td style={{ paddingLeft: "15px", color: "red" }}>
            <i className="far fa-trash-alt" />{" "}
          </td>
        </React.Fragment>
      );
    }

    let tempo = this.state.tempo;

    if (parseFloat(tempo) === 0 || !tempo) {
      tempo = "N/A";
    }

    let icon = <i className="fas fa-play samplePlayIcon" />;

    if (this.props.currentSample && this.props.sampleCurrentlyPlaying) {
      icon = <i className="fas fa-pause samplePauseIcon" />;
    }

    return (
      <Transition in={this.props.inProp} timeout={this.props.delay}>
        {transitionState => {
          return (
            <tr
              key={this.state.key}
              
              onClick={this.props.toggleTransition}
              className={this.props.oddRow}
              style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
            >
              <td className="setWidth">
                <div
                  data-sample-number={this.props.sampleNumber}
                  onClick={this.props.playSample}
                  className="circle"
                >
                  {icon}
                </div>
              </td>
              <td>{this.props.name}</td>
              <td
                onBlur={() => that.trimValue(that.genreRef)}
                onFocus={() => console.log("Start Editing")}
                contenteditable={`${that.state.editable}`}
                ref={this.genreRef}
              >
                {that.state.genre}
              </td>
              <td onBlur={() => that.trimValue(that.tempoRef)} ref={this.tempoRef} contenteditable={`${that.state.editable}`}>{tempo}</td>
              <td onBlur={() => that.trimValue(that.keyRef)} ref={this.keyRef} contenteditable={`${that.state.editable}`} className="mobileHide">{this.state.key}</td>
              {adminView}
            </tr>
          );
        }}
      </Transition>
    );
  }
}

export default sample;
