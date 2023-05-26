import React from "react";
import { multilanguage } from "redux-multilanguage";
import { updateProfile } from "state/ducks/profile/actions";
import { useDispatch, useSelector } from "react-redux";
import { getPlatformImageUrl } from "helpers/imageHelpers";

const PlatformCard = ({ platform, direct, strings }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);
  const handleDirectOn = (id) => {
    if (profile.platforms && profile.platforms.length > 0) {
      dispatch(updateProfile(profile.id, { direct: platform.id }));
    }
  };

  return (
    <div className="platform-card d-flex align-items-center justify-content-between p-2">
      <div className="d-flex align-items-center">
        <img
          src={getPlatformImageUrl(platform)}
          alt={platform.image}
          className="platform-image"
        />
        {platform.title} <br /> {strings["visits:"]} {platform.taps}
      </div>
      {direct && direct !== "" && direct !== platform.id && (
        <button
          className="direct-button"
          onClick={(e) => handleDirectOn(platform.id)}
        >
          {strings["Go Direct"]}
        </button>
      )}
    </div>
  );
};

export default multilanguage(PlatformCard);
