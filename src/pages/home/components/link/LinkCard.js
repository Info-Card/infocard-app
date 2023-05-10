import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomLink } from "state/ducks/profile/actions";

const LinkCard = ({ link }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);

  const handleDeleteLink = () => {
    dispatch(deleteCustomLink(profile.id, link.id));
  };

  const platformImage = link.image
    ? `${process.env.REACT_APP_IMAGE_URL}${link.image}`
    : "userphoto.png";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="platform-card d-flex"
      style={{
        height: "90px",
        margin: "10px 10px 30px 10px",
        textDecoration: "none",
      }}
    >
      <div className="d-flex align-items-center justify-content-between px-4">
        <img src={platformImage} alt={link.title} className="platform-image" />
        <div className="d-flex row">
          <h6>{link.title}</h6>
          <span className="max-lines">{link.url}</span>
        </div>
        <FontAwesomeIcon
          icon={faTrashAlt}
          color="red"
          onClick={handleDeleteLink}
        />
      </div>
    </a>
  );
};

export default LinkCard;
