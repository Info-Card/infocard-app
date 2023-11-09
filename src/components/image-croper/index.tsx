import { getCroppedImage } from '@/utils/canvas-utils';
import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Cropper from 'react-easy-crop';

const ImageCropper = ({ show, setShow, image, setImage }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImage(
          image,
          croppedAreaPixels
        );
        setImage(croppedImage);
        setShow(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels, setImage, setShow]);

  const onHide = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Crop Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 250,
            backgroundColor: '#ffffff',
          }}
        >
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={0.8}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCropImage}>
          Crop
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCropper;
