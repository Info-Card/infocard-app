import ImageCropper from "components/ImageCropper";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "state/ducks/profile/actions";

const ImageOptionsModal = ({ show, setShow }) => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.users);

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    if (croppedImage) {
      console.log(croppedImage);
      dispatch(updateProfile(profile.id, { image: croppedImage }));
      setImageSrc(null);
      setShow(false);
      setCroppedImage(null);
    }
  }, [dispatch, croppedImage, profile.id, setShow]);

  const selectImage = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/*";
    inputElement.onchange = (event) => {
      const file = event.target.files[0];
      console.log(file);
      const reader = new FileReader();

      reader.onload = () => {
        setImageSrc(reader.result);
      };

      reader.readAsDataURL(file);
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

      <ImageCropper
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        setCroppedImage={setCroppedImage}
      />
    </div>
  );
};

export default ImageOptionsModal;
