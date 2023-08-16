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
      <h4>Videos</h4>
      <Swiper
        style={{
          "--swiper-navigation-size": "25px",
        }}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        className="mySwiper"
      >
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
