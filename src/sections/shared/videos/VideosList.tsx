import React, { useState } from 'react';
import VideoCard from './VideoCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { AddVideoModal } from './AddVideoModal';
import { useUpdateVideosMutation } from '@/store/profile';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const VideosList = ({ profile, refetch }: any) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const [updateVideos] = useUpdateVideosMutation();

  const handleEditVideo = (index: any) => {
    setSelectedVideoIndex(index);
    setShowAddVideoModal(true);
  };

  const handleDeleteVideo = (index: any) => {
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
        const videos = profile.videos.filter(
          (_: any, i: any) => i !== index
        );
        if (result.isConfirmed) {
          await updateVideos({
            id: profile.id,
            body: {
              videos,
            },
          }).unwrap();
          refetch();
          toast.success('Video deleted');
        }
      });
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  if ((profile?.videos || []).length < 1) {
    return <></>;
  }

  return (
    <div className="mt-2">
      <h4>Videos</h4>
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination, Navigation]}
      >
        {profile?.videos?.map((video: any, index: any) => (
          <SwiperSlide key={index}>
            <VideoCard
              video={video}
              onEdit={() => handleEditVideo(index)}
              onDelete={() => handleDeleteVideo(index)}
            />
          </SwiperSlide>
        ))}

        <div className="d-flex justify-content-around">
          <div ref={navigationPrevRef}>
            <FaChevronLeft size={25} />
          </div>
          <div ref={navigationNextRef}>
            <FaChevronRight size={25} />
          </div>
        </div>
      </Swiper>

      <AddVideoModal
        key={selectedVideoIndex}
        show={showAddVideoModal}
        setShow={setShowAddVideoModal}
        index={selectedVideoIndex}
        profile={profile}
        refetch={refetch}
      />
    </div>
  );
};

export default VideosList;
