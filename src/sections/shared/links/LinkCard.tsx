import { AddLinkModal } from '@/sections/edit-profile/AddLinkModal';
import { useDeleteLinkMutation } from '@/store/link';
import { isNullOrEmpty } from '@/utils/helpers';
import { getLinkImageUrl } from '@/utils/image-helpers';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const LinkCard = ({
  link,
  direct,
  isDirect,
  handleDirectChange,
}: any) => {
  const { id } = useParams();

  const [showAddLinkModal, setShowAddLinkModal] = useState(false);

  const [deleteLink] = useDeleteLinkMutation();

  const handleDeleteLink = () => {
    try {
      Swal.fire({
        title: '<strong>Warning</strong>',
        icon: 'warning',
        html: 'Are you sure you want to delete this link?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteLink(link.id).unwrap();
          toast.success('Link deleted');
        }
      });
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleEditLink = () => {
    setShowAddLinkModal(true);
  };

  const handleLinkClick = () => {
    var urlString =
      link.platform.type === 'url'
        ? link.value
        : link.platform.webBaseURL + link.value;
    window.open(urlString, '_blank');
  };

  if (id) {
    return (
      <Col xs={4} onClick={handleLinkClick} className="text-center">
        <Image
          src={getLinkImageUrl(link)}
          alt={link.image}
          width={100}
          height={100}
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
          }}
        />
        <p style={{ fontSize: '12px' }}>
          {isNullOrEmpty(link.title)
            ? link.platform.title
            : link.title}
        </p>
      </Col>
    );
  }

  return (
    <Col xs={12}>
      <Card className="p-2 mb-2">
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="d-flex align-items-center"
            onClick={handleLinkClick}
          >
            <Image
              src={getLinkImageUrl(link)}
              alt="link-image"
              width={50}
              height={50}
              className="mr-2"
            />
            {isNullOrEmpty(link.title)
              ? link.platform?.title
              : link.title}{' '}
            <br /> visits: {link.taps}
          </div>
          {isDirect && direct !== link.id ? (
            <Button
              size="sm"
              variant="outline-dark"
              onClick={() => {
                handleDirectChange(link.id);
              }}
            >
              Go Direct
            </Button>
          ) : (
            <div className="d-flex ml-auto">
              <button
                className="icon-button"
                onClick={handleEditLink}
              >
                <FaPen color="grey" />
              </button>
              <button
                className="icon-button"
                onClick={handleDeleteLink}
              >
                <FaTrash color="red" />
              </button>
            </div>
          )}
        </div>
      </Card>
      <AddLinkModal
        show={showAddLinkModal}
        setShow={setShowAddLinkModal}
        platform={link.platform}
        link={link}
      />
    </Col>
  );
};

export default LinkCard;
