import React, { useEffect } from "react";
import { useSharedVideo, VideoItem } from "src/features/videos/index.tsx";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
const SharedVideoContainer: React.FC = () => {
  const { sharedVideoState, getSharedVideos } = useSharedVideo();

  useEffect(() => {
    !sharedVideoState.sharedVideoIds ||
      (sharedVideoState.sharedVideoIds.length == 0 && getSharedVideos());
  }, [sharedVideoState?.sharedVideoIds]);

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
      <Box
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button variant={"outlined"} onClick={handleLoadMore}>
          Load more...
        </Button>
      </Box>
    </>
  );
};

export default SharedVideoContainer;
