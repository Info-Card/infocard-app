import React, { useState } from 'react';
import ProductCard from './ProductCard';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@/store/product';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { AddProductModal } from './AddProductModal';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ProductsList = ({ profile }: any) => {
  const [showAddProductModal, setShowAddProductModal] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { data } = useGetProductsQuery<any>({
    limit: 100,
    profile: profile.id,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = (product: any) => {
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
        cancelButtonColor: 'black',
        confirmButtonColor: 'black',
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

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowAddProductModal(true);
  };

  if (data?.results?.length < 1) {
    return <></>;
  }

  return (
    <div className="mt-2">
      <h4>Links</h4>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination]}
      >
        {data?.results.map((product: any) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              onEdit={() => {
                handleEditProduct(product);
              }}
              onDelete={() => {
                handleDeleteProduct(product);
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <AddProductModal
        key={selectedProduct?.id}
        product={selectedProduct}
        show={showAddProductModal}
        setShow={setShowAddProductModal}
      />
    </div>
  );
};

export default ProductsList;
