import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomLink } from "state/ducks/profile/actions";
import { useParams } from "react-router-dom";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { AddCustomLinkModal } from "./AddCustomLinkModal";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getPlatformImageUrl } from "helpers/imageHelpers";

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
      <div
        className="d-flex align-items-center justify-content-start px-4"
        style={{ width: "100%" }}
      >
        <img
          src={getPlatformImageUrl(link)}
          alt={link.title}
          className="platform-image"
          style={{ marginRight: "10px" }}
        />
        <div
          className="d-flex flex-column"
          onClick={() => window.open(link.url)}
        >
          <h6>{link.title}</h6>
          <span className="profile-url">{link.url}</span>
        </div>
        {!params.username && (
          <div className="d-flex ml-auto">
            <FontAwesomeIcon
              icon={faEdit}
              className="mr-2"
              color="blue"
              onClick={() => handleEditLink(link)}
            />
            <FontAwesomeIcon
              color="red"
              onClick={handleDeleteLink}
              icon={faTrash}
            />
          </div>
        )}
      </div>
      <AddCustomLinkModal
        link={link}
        show={showCustomLinkModal}
        setShow={setShowCustomLinkModal}
        key={Math.random()}
      />
    </div>
  );
};

export default LinkCard;
