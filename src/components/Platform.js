import React from 'react';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Platform = ({ platform, showCheck }) => {
  return (
    <div className="text-center">
      {showCheck && platform.value ? (
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <FontAwesomeIcon icon={faCheckCircle} size="1x" color="green" />
        </div>
      ) : (
        <></>
      )}
      <img
        src={process.env.REACT_APP_API_URL + platform.image}
        alt={platform.image}
        className="card-img-top p-1"
      />
      <p>{platform.title}</p>
    </div>
  );
};

export default Platform;
