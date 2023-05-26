import React from "react";

import LinkCard from "./LinkCard";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Pagination]);

const LinksList = ({ links }) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <h5>Links</h5>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        {links.map((link) => (
          <SwiperSlide key={link.id}>
            <LinkCard link={link} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LinksList;
