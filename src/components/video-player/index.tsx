import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }: any) => {
  const [height, setHeight] = useState<number>(240);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 575.98) {
        setHeight(230); // Adjust the height for extra small screens
      } else if (windowWidth <= 767.98) {
        setHeight(280); // Adjust the height for small screens
      } else {
        setHeight(350); // Default height for larger screens
      }
    };

    // Initial call to set the initial height
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ReactPlayer
      url={url}
      width="100%"
      height={`${height}px`}
      config={{
        youtube: { playerVars: { controls: 1 } },
      }}
    />
  );
};

export default VideoPlayer;
