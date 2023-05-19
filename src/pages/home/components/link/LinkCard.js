import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomLink } from "state/ducks/profile/actions";
import { useParams } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { AddCustomLinkModal } from "./AddCustomLinkModal";

const LinkCard = ({ link }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const handleDeleteLink = () => {
    dispatch(deleteCustomLink(profile.id, link.id));
  };
  const handleEditLink = () => {
    setShowCustomLinkModal(true);
  };
  const platformImage = link.image
    ? `${process.env.REACT_APP_IMAGE_URL}${link.image}`
    : "userphoto.png";
  return (
    <div
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
        <div className="d-flex row" onClick={() => window.open(link.url)}>
          <h6>{link.title}</h6>
          <span className="max-lines">{link.url}</span>
        </div>
        {!params.username && (
          <FontAwesomeIcon
            icon={faEdit}
            className="mr-2"
            color="blue"
            onClick={() => handleEditLink(link)}
          />
        )}
        {!params.username && (
          <FontAwesomeIcon
            icon={faTrashAlt}
            color="red"
            onClick={handleDeleteLink}
          />
        )}
      </div>
      <AddCustomLinkModal
        link={link}
        show={showCustomLinkModal}
        setShow={setShowCustomLinkModal}
      />
    </div>
  );
};

export default LinkCard;
