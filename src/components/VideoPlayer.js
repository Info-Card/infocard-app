import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
  return (
    <ReactPlayer
      url={`${(video ?? "").split("&")[0]}&origin=http://localhost:3000`}
      width="100%"
      height="230px"
    />
  );
};

export default VideoPlayer;
