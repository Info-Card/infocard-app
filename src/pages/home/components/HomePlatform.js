import React from 'react';

const HomePlatform = ({ platform, showMakeDirect, handleDirectOn }) => {
  return (
    <div className="platform-card d-flex align-items-center justify-content-between p-2">
      <div className="d-flex align-items-center">
        <img
          src={process.env.REACT_APP_API_URL + platform.image}
          alt={platform.image}
          className="platform-image"
        />
        {platform.title} (views: {platform.taps})
      </div>
      {showMakeDirect && (
        <button
          className="direct-button"
          onClick={(e) => handleDirectOn(platform.id)}
        >
          Make Direct
        </button>
      )}
    </div>
  );
};

export default HomePlatform;
