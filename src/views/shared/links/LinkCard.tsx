import { isNullOrEmpty } from '@/core/utils/helpers';
import { getLinkImageUrl } from '@/core/utils/image-helpers';
import Image from 'next/image';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const LinkCard = ({
  link,
  direct,
  directOn,
  handleDirectChange,
}: any) => {
  console.log(direct);

  return (
    <Card className="p-2 mb-2">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Image
            src={getLinkImageUrl(link)}
            alt={link.image}
            width={50}
            height={50}
            className="mr-2"
          />
          {isNullOrEmpty(link.title)
            ? link.platform?.title
            : link.title}{' '}
          <br /> visits: {link.taps}
        </div>
        {directOn && direct !== link.id && (
          <Button
            size="sm"
            variant="outline-dark"
            onClick={() => {
              handleDirectChange(link.id);
            }}
          >
            Go Direct
          </Button>
        )}
      </div>
    </Card>
  );
};

export default LinkCard;
