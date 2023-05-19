import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ImageViewer from "react-simple-image-viewer";
import ImageOptionsModal from "../ImageOptionsModal";

const ProfileFormHead = (props) => {
  const profile = props.profile;
  const [showImage, setShowImage] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  return (
    <>
      <div
        className="profile-cover"
        style={{
          backgroundColor: props.color,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            margin: "auto",
          }}
        >
          <img
            src={
              profile.image && profile.image !== ""
                ? process.env.REACT_APP_IMAGE_URL + profile.image
                : `${process.env.PUBLIC_URL}/assets/images/placeholder/user.png`
            }
            className="profile-image rounded-circle"
            alt=""
            onClick={() => {
              if (profile.image && profile.image !== "") setShowImage(true);
            }}
          />
          <div
            className="card p-2 rounded-circle"
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onClick={() => {
              setShowImageOptions(true);
            }}
          >
            <FontAwesomeIcon icon={faPen} size="1x" />
          </div>
        </div>
      </div>
      {showImage && (
        <div className="image-viewer">
          <ImageViewer
            src={[process.env.REACT_APP_IMAGE_URL + profile.image]}
            closeOnClickOutside={true}
            onClose={() => {
              setShowImage(false);
            }}
          />
        </div>
      )}
      <ImageOptionsModal
        show={showImageOptions}
        setShow={setShowImageOptions}
      />
    </>
  );
};

export default ProfileFormHead;
