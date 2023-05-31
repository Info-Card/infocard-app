import React, { useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getCroppedImg } from "../helpers/canvasUtils";
import Cropper from "react-easy-crop";

const ImageCropper = ({ imageSrc, setImageSrc, setCroppedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, setCroppedImage]);

  return (
    <Modal show={imageSrc} onHide={setImageSrc}>
      <Modal.Header closeButton>
        <Modal.Title>Crop Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 250,
            backgroundColor: "#ffffff",
          }}
        >
          <Cropper
            style={{
              backgroundColor: "#ffffff",
            }}
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={cropImage}>
          Crop
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCropper;
