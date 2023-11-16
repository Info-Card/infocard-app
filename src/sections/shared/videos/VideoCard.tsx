import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import VideoPlayer from '@/components/video-player';

const VideoCard = ({ video, onEdit, onDelete }: any) => {
  const { id } = useParams();

  return (
    <>
      <div
        className="mb-2"
        style={{
          position: 'relative',
        }}
      >
        {!id && (
          <div
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}
          >
            <div className="d-flex p-2">
              <button className="icon-button" onClick={onEdit}>
                <FaPen color="grey" />
              </button>
              <button className="icon-button" onClick={onDelete}>
                <FaTrash color="red" />
              </button>
            </div>
          </div>
        )}
        <VideoPlayer url={video} />
      </div>
    </>
  );
};

export default VideoCard;
