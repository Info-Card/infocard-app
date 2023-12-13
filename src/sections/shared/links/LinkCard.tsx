import CustomToggle from '@/components/custom-toggle';
import { isNullOrEmpty } from '@/utils/helpers';
import { getLinkImageUrl } from '@/utils/image-helpers';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { FaPen, FaTrash } from 'react-icons/fa';

interface LinksListParams {
  link: any;
  direct: any;
  isDirect: boolean;
  handleDirectChange: any;
  handleLinkClick: any;
  onEdit: any;
  onDelete: any;
}

const LinkCard = ({
  link,
  direct,
  isDirect,
  handleDirectChange,
  handleLinkClick,
  onEdit,
  onDelete,
}: LinksListParams) => {
  const { id } = useParams();

  if (id) {
    return (
      <Col xs={4} onClick={handleLinkClick} className="text-center">
        <Image
          src={getLinkImageUrl(link)}
          alt="link-image"
          className="p-1"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {isNullOrEmpty(link.title)
            ? link.platform.title
            : link.title}
        </span>
      </Col>
    );
  }

  return (
    <Col xs={12}>
      <Card className="p-2">
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
            />
            <div
              className="d-flex flex-column"
              style={{
                flexGrow: 1,
                marginLeft: '10px',
                marginRight: '10px',
              }}
            >
              <strong>
                {isNullOrEmpty(link.title)
                  ? link.platform?.title
                  : link.title}{' '}
              </strong>
              <p>visits: {link.taps}</p>
            </div>
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
            !isDirect && (
              <div className="d-flex ml-auto">
                <button className="icon-button" onClick={onEdit}>
                  <FaPen color="grey" />
                </button>
                <button className="icon-button" onClick={onDelete}>
                  <FaTrash color="red" />
                </button>
              </div>
            )
          )}
        </div>
      </Card>
    </Col>
  );
};

export default LinkCard;
