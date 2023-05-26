import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPlatformImageUrl } from "helpers/imageHelpers";

const Platform = ({ platform, showCheck }) => {
  return (
    <div className="text-center">
      {showCheck && platform.value ? (
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <FontAwesomeIcon icon={faCheckCircle} size="1x" color="green" />
        </div>
      ) : (
        <></>
      )}
      <img
        src={getPlatformImageUrl(platform)}
        alt={platform.image}
        className="img-fluid pb-1"
      />
      <p id="title-size-adjustment">{platform.title}</p>
    </div>
  );
};

export default Platform;
