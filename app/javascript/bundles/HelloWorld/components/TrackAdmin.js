import React from "react";

// const trackAdmin = props => {

  class trackAdmin extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        editable: false,
        name: props.name,
      };

    }

    editSwitch = bool => {
      this.setState({
        editable: bool
      });
    };
 
  

  render() {

    let that = this;

    let icon = <i onClick={this.props.playPauseTrack} className="fas fa-play samplePlayIcon" />;

  if (this.props.currentTrack && this.props.currentlyPlaying) {
    icon = <i onClick={this.props.playPauseTrack} className="fas fa-pause samplePauseIcon" />;
  }

  let soundcloudNoStreaming;
  let spotifyNoStreaming;
  let youtubeNoStreaming;
  let appleMusicNoStreaming;
  

  if(!this.props.spotifyLink) {
    spotifyNoStreaming = "noStreamingLink"
  }

  if(!this.props.soundcloudLink) {
    soundcloudNoStreaming = "noStreamingLink"
  }

  if(!this.props.youtubeLink) {
    youtubeNoStreaming = "noStreamingLink"
  }

  if(!this.props.appleMusicLink) {
    appleMusicNoStreaming = "noStreamingLink"
  }


  return (
    <React.Fragment>
    <tr
      key={this.props.key}
      onClick={this.props.toggleTransition}
      className={this.props.oddRow}
    >
      <td className="setWidth">
        <div
          data-track-number={this.props.trackNumber}
          onClick={this.props.playSample}
          className="circle"
          style={this.props.bgImage}
        >
          {icon}
        </div>
      </td>
      <td>{this.props.name}</td>
      <td className="centerColContent">{this.props.releaseDate}</td>
      <td className="centerColContent">
        <a
          className={soundcloudNoStreaming}
          href={this.props.soundcloudLink}
          target="_blank"
        >
          <i className="fab fa-soundcloud" />
        </a>
      </td>
      <td  className="centerColContent">
        <a className={spotifyNoStreaming} href={this.props.spotifyLink} target="_blank">
          <i className="fab fa-spotify" />
        </a>
      </td>
      <td className="centerColContent">
      <a className={youtubeNoStreaming} href={this.props.youtubeLink} target="_blank">
          <i className="fab fa-youtube" />
        </a>
      </td>
      <td className="centerColContent">
      <a className={appleMusicNoStreaming} href={this.props.appleMusicLink} target="_blank">
          <i className="fab fa-apple" />
        </a>
      </td>
      <td>
        {/* <a href={"/sounds/" + this.props.id + "/edit"}> */}
          <i onClick={this.props.editTrack} style={{ marginLeft: "10px", cursor: 'pointer' }} className="far fa-edit">
            {" "}
          </i>
        {/* </a> */}
      </td>
      <td style={{ paddingLeft: "15px" }}>
        <i onClick={this.props.deleteTrack} className="far fa-trash-alt" />{" "}
      </td>
    </tr>
    <iframe  className="soundclouds" id={"sc-widget" + "index"} allow="autoplay"  src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + this.props.soundcloud_id + "&visual=true"}></iframe>
    </React.Fragment>
  );
};
    };

export default trackAdmin;
