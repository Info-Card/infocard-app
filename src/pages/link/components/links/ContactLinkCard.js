import { getLinkImageUrl } from "helpers/imageHelpers";
import React from "react";
import { useDispatch } from "react-redux";
import { updateSharedLink } from "state/ducks/links/actions";

const ContactLinkCard = ({ link }) => {
  const dispatch = useDispatch();
  const handleShare = () => {
    dispatch(updateSharedLink(link.id, { isShared: !link.isShared }));
  };

  return (
    <div className="platform-card d-flex align-items-center justify-content-between p-2 mt-2">
      <div className="d-flex align-items-center">
        <img
          src={getLinkImageUrl(link)}
          alt={link.image}
          className="platform-image"
        />
        {link.title}
      </div>
      <div className="d-flex flex-row">
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id={link.id}
            value="off"
            checked={link.isShared}
            onChange={handleShare}
          />
          <label className="custom-control-label" htmlFor={link.id}></label>
        </div>
      </div>
    </div>
  );
};

export default ContactLinkCard;
