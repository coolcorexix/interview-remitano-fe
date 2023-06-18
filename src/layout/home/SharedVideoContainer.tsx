import React, { useEffect } from "react";
import { useSharedVideo, VideoItem } from "src/features/videos";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const SharedVideoContainer: React.FC = () => {
  const { sharedVideoState, getSharedVideos } = useSharedVideo();

  useEffect(() => {
    !sharedVideoState.sharedVideoIds ||
      (sharedVideoState.sharedVideoIds.length == 0 && getSharedVideos());
  }, []);

  const handleLoadMore = () => {
    getSharedVideos();
  };

  const renderItem = (videoId: string) => {
    const data = sharedVideoState.sharedVideos[videoId];
    return <VideoItem key={videoId || "1"} data={data} />;
  };

  return (
    <>
      {sharedVideoState.sharedVideoIds.map(renderItem)}
      <IconButton onClick={handleLoadMore}>
        <ExpandMoreIcon />
      </IconButton>
    </>
  );
};

export default SharedVideoContainer;
