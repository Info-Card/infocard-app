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
        pagination={{ clickable: true, dynamicBullets: true }}
        on={{
          slideChangeTransitionStart: () => {
            const videos = document.querySelectorAll("video");
            Array.prototype.forEach.call(videos, function (video) {
              video.pause();
            });
          },
          slideChangeTransitionEnd: () => {
            const activeIndex = this.swiper.activeIndex;
            const activeSlide =
              document.getElementsByClassName("swiper-slide")[activeIndex];
            const activeSlideVideo =
              activeSlide.getElementsByTagName("video")[0];
            activeSlideVideo.play();
          },
        }}
        loop
        spaceBetween={26}
        touchEventsTarget="container"
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
              {video !== "" && (
                <div className="video-card-wrapper">
                  <VideoCard video={video} />
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default VideoList;
