import CustomToggle from '@/components/custom-toggle';
import { isNullOrEmpty } from '@/utils/helpers';
import { getLinkImageUrl } from '@/utils/image-helpers';
import Image from 'next/image';
import React from 'react';
import { Card, Col } from 'react-bootstrap';

const ContactLinkCard = ({ link, handleShareChange }: any) => {
  return (
    <Col xs={12}>
      <Card className="p-2">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
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
            </div>
          </div>
          <CustomToggle
            id="contact"
            checked={link.isContact}
            onChange={handleShareChange}
          />
        </div>
      </Card>
    </Col>
  );
};

export default ContactLinkCard;
