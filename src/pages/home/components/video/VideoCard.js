import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import VideoPlayer from "../../../../components/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { updateVideos } from "state/ducks/profile/actions";
import { useParams } from "react-router-dom";

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { profile } = useSelector((state) => state.users);

  const handleDeleteVideo = () => {
    let videos = profile.videos ?? [];
    videos = videos.filter((e) => e !== video);
    dispatch(updateVideos(profile.id, { videos: videos }));
  };

  return (
    <div
      style={{
        display: "inline-block",
        margin: "10px 10px 30px 10px",
      }}
    >
      <div className="text-right" style={{}}>
        {!params.username && (
          <FontAwesomeIcon
            icon={faTrash}
            size="1x"
            className="delete-video"
            onClick={handleDeleteVideo}
          />
        )}
      </div>
      <VideoPlayer video={video} />
    </div>
  );
};

export default VideoCard;
