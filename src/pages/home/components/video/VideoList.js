import React from "react";
import VideoCard from "./VideoCard";
import SwiperCore, { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Pagination, Navigation]);

const VideoList = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <h5>Videos</h5>
      <Swiper
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        className="mySwiper"
      >
        {/* <Swiper
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination]}
        loop
        spaceBetween={26}
        touchEventsTarget="container"
      > */}
        {videos.map((video) => {
          return (
            <SwiperSlide key={video}>
              {video !== "" && <VideoCard video={video} />}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VideoList;
