import React from 'react';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '@/store/product';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ProductsList = ({ profile }: any) => {
  const { data } = useGetProductsQuery<any>({
    profile: profile.id,
  });

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
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsList;
