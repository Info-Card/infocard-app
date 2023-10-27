import { isNullOrEmpty } from '@/core/utils/helpers';
import { getLinkImageUrl } from '@/core/utils/image-helpers';
import Image from 'next/image';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

const LinkCard = ({ link, direct }: any) => {
  const handleDirectOn = () => {};

  return (
    <Card className="p-2 mb-2">
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
      {direct && direct !== '' && direct !== link.id && (
        <Button onClick={(e) => handleDirectOn()}>Go Direct</Button>
      )}
    </Card>
  );
};

export default LinkCard;
