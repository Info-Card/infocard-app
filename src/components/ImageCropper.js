import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function base64ToFile(base64Data) {
  const base64Regex = /^data:image\/(\w+);base64,/;
  const matches = base64Data.match(base64Regex);
  if (!matches) {
    throw new Error(
      "Invalid Base64 format. Expected data URL with image data."
    );
  }

  const mimeType = matches[1];
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: `image/${mimeType}` });
  const file = new File([blob], `image.${mimeType}`, {
    type: `image/${mimeType}`,
    lastModified: Date.now(),
  });

  return file;
}

const ImageCropper = ({ imageSrc, setImageSrc, setCroppedImage }) => {
  const [result, setResult] = useState();

  const [crop, setCrop] = useState({
    unit: "%",
    width: 100,
    aspect: 1,
  });
  const [image, setImage] = useState(null);

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  };

  return (
    <Modal show={imageSrc} onHide={setImageSrc}>
      <Modal.Header closeButton>
        <Modal.Title>Crop Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            width: "250px",
            height: "250px",
            margin: "auto",
            overflow: "scroll",
          }}
        >
          <ReactCrop
            src={imageSrc}
            onImageLoaded={setImage}
            crop={crop}
            onChange={setCrop}
            onComplete={cropImageNow}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            const image = base64ToFile(result);
            setCroppedImage(image);
          }}
        >
          Crop
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCropper;
