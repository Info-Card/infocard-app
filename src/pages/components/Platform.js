import React from 'react';

const Platform = ({ platform }) => {
  return (
    <div className="">
      <a
        href={
          platform.isUrl && !platform.value.startsWith('http')
            ? 'https://' + platform.value
            : platform.webBaseURL + platform.value
        }
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={process.env.REACT_APP_API_URL + platform.image}
          alt={platform.image}
          className="card-img-top p-1"
        />
      </a>
      <p>{platform.title}</p>
    </div>
  );
};

export default Platform;
