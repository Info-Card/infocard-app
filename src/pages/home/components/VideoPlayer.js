import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ video }) => {
  return (
    <div className="player-card">
      <ReactPlayer
        url={video}
        config={{
          youtube: {
            playerVars: { showinfo: 0, origin: 'https://app.infocard.me' },
          },
        }}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
