import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "state/ducks/profile/actions";

const ImageOptionsModal = ({ show, setShow }) => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.users);

  const selectImage = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = (event) => {
      const image = event.target.files;
      dispatch(updateProfile(profile.id, { image }));
      setShow(false);
    };
    inputElement.click();
  };

  const deleteImage = () => {
    setShow(false);
    dispatch(updateProfile(profile.id, { image: "" }));
  };

  return (
    <div>
      <Modal show={show} size="sm">
        <Modal.Header closeButton onHide={(e) => setShow(false)}>
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

export default ImageOptionsModal;
