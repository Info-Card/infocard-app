import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { updateProfileMedia } from "state/ducks/profile/actions";

const ProfileFormModal = () => {
  const { profile } = useSelector((state) => state.users);
  const [showImageOptions, setShowImageOptions] = useState(true);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  function selectImage() {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = (event) => {
      const selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append("image", selectedFile);
      dispatch(updateProfileMedia(profile.id, formData));
      setShowImageOptions(false);
    };
    inputElement.click();
  }
  function deleteImage() {
    setShowImageOptions(false);
    dispatch(updateProfileMedia(profile.id, { image: "" }));
    setShowImageOptions(false);
  }
  return (
    <div>
      <Modal show={showImageOptions} size="sm">
        <Modal.Header closeButton onHide={(e) => setShowImageOptions(false)}>
          <Modal.Title>Choose Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={selectImage}>
              Edit
            </Button>
            <Button variant="outline-danger" onClick={deleteImage}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfileFormModal;
