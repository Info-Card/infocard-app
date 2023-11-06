import ImageCropper from '@/components/image-croper';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ProfileImageOptionsModal = ({ show, setShow }: any) => {
  const [image, setImage] = useState(null);
  const [showImageCropper, setShowImageCropper] = useState(false);

  const onClose = () => {
    setShow(false);
  };

  const handleImageEdit = () => {
    document?.getElementById('fileInput')?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
    setShowImageCropper(true);
  };

  const handleImageDelete = () => {};

  return (
    <>
      <Modal show={show} size="sm">
        <Modal.Header closeButton onHide={onClose}>
          <Modal.Title>Choose Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleImageEdit}>
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={handleImageDelete}
            >
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <ImageCropper
        show={showImageCropper}
        setShow={setShowImageCropper}
        image={image}
        setImage={setImage}
      />
    </>
  );
};

export default ProfileImageOptionsModal;
