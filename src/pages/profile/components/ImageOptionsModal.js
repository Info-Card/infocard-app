import ImageCropper from "components/ImageCropper";
import heic2any from "heic2any";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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

  const selectImage = async () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    document.body.appendChild(inputElement);
    inputElement.onchange = async (event) => {
      const file = event.target.files[0];
      if (file.type.startsWith("image/")) {
        if (file.type === "image/heic" || file.type === "image/heif") {
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
          });
          const convertedFile = new File([convertedBlob], file.name, {
            type: "image/jpeg",
          });
          setImageSrc(URL.createObjectURL(convertedFile));
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            console.log(reader.result);
            setImageSrc(reader.result);
          };
          reader.readAsDataURL(file);
        }
      } else {
        toast.error("Invalid file type. Please select an image file.");
        console.error("Invalid file type. Please select an image file.");
      }

      document.body.removeChild(inputElement);
    };
    console.log("clicked");
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
