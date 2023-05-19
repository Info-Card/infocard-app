import React from "react";
import VideoCard from "./VideoCard";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Pagination]);

const VideoList = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <h5>Videos</h5>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop
        spaceBetween={26}
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
