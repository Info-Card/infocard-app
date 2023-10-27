import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CustomLinkCard from './CustomLinkCard';

const CustomLinksList = ({ links }: any) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <h4>Links</h4>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={1}
      >
        {links.map((link: any) => (
          <SwiperSlide key={link.id}>
            <CustomLinkCard link={link} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomLinksList;
