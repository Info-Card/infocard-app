import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ video }) => {
  console.log(video);
  return (
    <div className="player-card">
      <ReactPlayer
        url={video}
        config={{
          youtube: {
            playerVars: { showinfo: 0, origin: 'https://app.vitacode.io' },
          },
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
