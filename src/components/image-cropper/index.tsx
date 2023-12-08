import { getCroppedImage } from '@/utils/canvas-utils';
import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Cropper from 'react-easy-crop';

const ImageCropper = ({ file, setFile, setCroppedImage }: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const cropImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImage(
          file,
          croppedAreaPixels
        );
        if (croppedImage) {
          setCroppedImage(croppedImage);
          setFile(null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [file, setFile, croppedAreaPixels, setCroppedImage]);

  return (
    <Modal show={file !== null}>
      <Modal.Header
        closeButton
        onHide={() => {
          setFile(null);
        }}
      >
        <Modal.Title>Crop Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="m-auto mb-3"
          style={{
            position: 'relative',
            width: 250,
            height: 250,
            backgroundColor: '#ffffff',
          }}
        >
          <Cropper
            image={file}
            crop={crop}
            zoom={zoom}
            aspect={0.8}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <Button className="mr-auto" onClick={cropImage}>
          Crop
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ImageCropper;
