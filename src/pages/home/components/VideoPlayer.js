import React from 'react';
import ReactPlayer from 'react-player/youtube';

const VideoPlayer = ({ video }) => {
  return (
    <div className="player-card">
      <ReactPlayer url={video} width="100%" height="100%" />
    </div>
  );
};

export default VideoPlayer;
