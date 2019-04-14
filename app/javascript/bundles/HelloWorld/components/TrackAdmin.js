import React from "react";

const trackAdmin = props => {
  let icon = <i onClick={props.playPauseTrack} className="fas fa-play samplePlayIcon" />;

  if (props.currentTrack && props.currentlyPlaying) {
    icon = <i onClick={props.playPauseTrack} className="fas fa-pause samplePauseIcon" />;
  }

  let soundcloudNoStreaming;
  let spotifyNoStreaming;
  let youtubeNoStreaming;
  let appleMusicNoStreaming;
  

  if(!props.spotifyLink) {
    spotifyNoStreaming = "noStreamingLink"
  }

  if(!props.soundcloudLink) {
    soundcloudNoStreaming = "noStreamingLink"
  }

  if(!props.youtubeLink) {
    youtubeNoStreaming = "noStreamingLink"
  }

  if(!props.appleMusicLink) {
    appleMusicNoStreaming = "noStreamingLink"
  }



  return (
    <React.Fragment>
    <tr
      key={props.key}
      onClick={props.toggleTransition}
      className={props.oddRow}
    >
      <td className="setWidth">
        <div
          data-track-number={props.trackNumber}
          onClick={props.playSample}
          className="circle"
          style={props.bgImage}
        >
          {icon}
        </div>
      </td>
      <td>{props.name}</td>
      <td>{props.releaseDate}</td>
      <td>
        <a
          className={soundcloudNoStreaming}
          href={props.soundcloudLink}
          target="_blank"
        >
          <i className="fab fa-soundcloud" />
        </a>
      </td>
      <td>
        <a className={spotifyNoStreaming} href={props.spotifyLink} target="_blank">
          <i className="fab fa-spotify" />
        </a>
      </td>
      <td>
      <a className={youtubeNoStreaming} href={props.youtubeLink} target="_blank">
          <i className="fab fa-youtube" />
        </a>
      </td>
      <td>
      <a className={appleMusicNoStreaming} href={props.appleMusicLink} target="_blank">
          <i className="fab fa-apple" />
        </a>
      </td>
      <td>
        <a href={"/sounds/" + props.id + "/edit"}>
          <i style={{ marginLeft: "10px" }} className="far fa-edit">
            {" "}
          </i>
        </a>
      </td>
      <td style={{ paddingLeft: "15px" }}>
        <i className="far fa-trash-alt" />{" "}
      </td>
    </tr>
    <iframe  className="soundclouds" id={"sc-widget" + "index"} allow="autoplay"  src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + props.soundcloud_id + "&visual=true"}></iframe>
    </React.Fragment>
  );
};

export default trackAdmin;
