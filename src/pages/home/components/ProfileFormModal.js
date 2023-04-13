import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { updateProfileMedia } from "state/ducks/profile/actions";

const ProfileFormModal = () => {
  const { profile } = useSelector((state) => state.users);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  function selectImage() {
    setShowImageOptions(false);
    inputFile.current.click();
  }
  function deleteImage() {
    setShowImageOptions(false);
    dispatch(updateProfileMedia(profile.id, { image: "" }));
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
