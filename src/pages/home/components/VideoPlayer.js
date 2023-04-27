import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
  console.log(`${video}&autoplay=0`);
  return (
    <div className="player-card">
      <ReactPlayer
        url={`${(video ?? "").split("&")[0]}&origin=http://localhost:3000`}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
