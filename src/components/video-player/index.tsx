import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }: any) => {
  const [height, setHeight] = useState<number>(240);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 575.98) {
        setHeight(180); // Adjust the height for extra small screens
      } else if (windowWidth <= 767.98) {
        setHeight(200); // Adjust the height for small screens
      } else {
        setHeight(240); // Default height for larger screens
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
    <ReactPlayer url={url} width="100%" height={`${height}px`} />
  );
};

export default VideoPlayer;
