import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { getProductImageUrl } from '@/utils/image-helpers';

const ProductCard = ({ product, onEdit, onDelete }: any) => {
  const { id } = useParams();

  return (
    <Card
      className="d-flex flex-row align-items-center justify-content-start px-2 m-2 mb-4"
      style={{
        height: '90px',
      }}
    >
      <Image
        src={getProductImageUrl(product)}
        alt="product-image"
        className="mr-1"
        width={50}
        height={50}
      />
      <div
        className="d-flex flex-column"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flexGrow: 1,
          marginLeft: '10px',
          marginRight: '10px',
        }}
        onClick={() => window.open(product.url)}
      >
        <strong>{product.title}</strong>
        <span>{product.url}</span>
      </div>
      {!id && (
        <div className="d-flex">
          <button className="icon-button" onClick={onEdit}>
            <FaPen color="grey" />
          </button>
          <button className="icon-button" onClick={onDelete}>
            <FaTrash color="red" />
          </button>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
