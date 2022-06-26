import React from 'react';

const ContactPlatform = ({ platform, handleShare }) => {
  return (
    <div className="platform-card d-flex align-items-center justify-content-between p-2 mt-2">
      <div className="d-flex align-items-center">
        <img
          src={process.env.REACT_APP_API_URL + platform.image}
          alt={platform.image}
          className="platform-image"
        />
        {platform.title}
      </div>
      <div className="d-flex flex-row">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id={platform.id}
            value="off"
            checked={platform.isShared}
            onChange={() => {
              handleShare(platform.id, !platform.isShared);
            }}
          />
          <label className="custom-control-label" htmlFor={platform.id}></label>
        </div>
      </div>
    </div>
  );
};

export default ContactPlatform;
