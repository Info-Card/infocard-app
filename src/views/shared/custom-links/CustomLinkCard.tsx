import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
// import { AddCustomLinkModal } from './AddCustomLinkModal';
import { getPlatformImageUrl } from '@/core/utils/image-helpers';
import { useParams } from 'next/navigation';
import { AddCustomLinkModal } from './AddCustomLinkModal';
import Image from 'next/image';

const CustomLinkCard = ({ link }: any) => {
  const params = useParams();

  const [showCustomLinkModal, setShowCustomLinkModal] =
    useState(false);

  const handleDeleteLink = () => {};

  const handleEditLink = () => {
    setShowCustomLinkModal(true);
  };

  return (
    <div
      className="d-flex"
      style={{
        height: '90px',
        margin: '10px 10px 30px 10px',
        textDecoration: 'none',
        boxShadow: '0 0 10px rgb(200, 200, 200)',
        borderRadius: '12px',
      }}
    >
      <div
        className="d-flex align-items-center justify-content-start px-4"
        style={{ width: '100%' }}
      >
        <Image
          src={getPlatformImageUrl(link)}
          alt={link.title}
          width={50}
          height={50}
          style={{
            marginRight: '10px',
            objectFit: 'cover',
          }}
        />
        <div
          className="d-flex flex-column"
          onClick={() => window.open(link.url)}
        >
          <h6>{link.title}</h6>
          <p>{link.url}</p>
        </div>
        {!params.username && (
          <div className="d-flex ml-auto">
            <div onClick={handleEditLink}>
              <FaEdit className="mr-2" color="blue" size={20} />
            </div>
            <div onClick={handleDeleteLink}>
              <FaTrash color="red" size={20} />
            </div>
          </div>
        )}
      </div>
      <AddCustomLinkModal
        link={link}
        show={showCustomLinkModal}
        setShow={setShowCustomLinkModal}
        key={Math.random()}
      />
    </div>
  );
};

export default CustomLinkCard;
