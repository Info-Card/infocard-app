import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { AddProductModal } from './AddProductModal';
import { Card } from 'react-bootstrap';
import { useDeleteProductMutation } from '@/store/product';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getProductImageUrl } from '@/utils/image-helpers';

const ProductCard = ({ product }: any) => {
  const { id } = useParams();

  const [showAddProductModal, setShowAddProductModal] =
    useState(false);

  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = () => {
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
          await deleteProduct(product.id).unwrap();
          toast.success('Link deleted');
        }
      });
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleEditProduct = () => {
    setShowAddProductModal(true);
  };

  return (
    <>
      <Card
        className="d-flex flex-row align-items-center justify-content-start px-2 m-2 mb-4"
        style={{
          height: '90px',
        }}
      >
        <Image
          src={getProductImageUrl(product)}
          alt={product.title}
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
          }}
          onClick={() => window.open(product.url)}
        >
          <h6>{product.title}</h6>
          <span>{product.url}</span>
        </div>
        {!id && (
          <div className="d-flex ml-auto">
            <FaEdit
              className="mr-2"
              color="blue"
              size={20}
              onClick={handleEditProduct}
            />
            <FaTrash
              color="red"
              size={20}
              onClick={handleDeleteProduct}
            />
          </div>
        )}
      </Card>
      <AddProductModal
        product={product}
        show={showAddProductModal}
        setShow={setShowAddProductModal}
      />
    </>
  );
};

export default ProductCard;
