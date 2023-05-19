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
  const [crop, setCrop] = useState({ unit: "px", width: 200, aspect: 1 });

  const [result, setResult] = useState();

  const handleCropComplete = (cropResult) => {
    if (cropResult.width && cropResult.height) {
      getCroppedImage(cropResult);
    }
  };

  const getCroppedImage = (cropResult) => {
    const canvas = document.createElement("canvas");
    const image = document.createElement("img");

    image.src = imageSrc;

    image.onload = () => {
      const size = Math.min(cropResult.width, cropResult.height);
      const canvasWidth = size;
      const canvasHeight = size;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        cropResult.x,
        cropResult.y,
        cropResult.width,
        cropResult.height,
        0,
        0,
        canvasWidth,
        canvasHeight
      );

      const croppedImageUrl = canvas.toDataURL("image/jpeg");
      setResult(croppedImageUrl);
    };
  };

  return (
    <Modal show={imageSrc} onHide={setImageSrc}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {result && <img src={result} />}
        <ReactCrop
          src={imageSrc}
          crop={crop}
          onChange={(newCrop) => setCrop(newCrop)}
          onComplete={handleCropComplete}
        />
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
