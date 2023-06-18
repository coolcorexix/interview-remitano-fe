import React, { useEffect, useRef } from "react";
import { useSharedVideo, VideoItem } from "src/features/videos";

const SharedVideoList: React.FC = () => {
  const { sharedVideoState, getSharedVideos } = useSharedVideo();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollPosition = container.scrollHeight - container.scrollTop;
        const containerHeight = container.clientHeight;
        if (scrollPosition <= containerHeight) {
          getSharedVideos();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [getSharedVideos]);

  const renderItem = (videoId: string) => {
    const data = sharedVideoState.sharedVideos[videoId];
    return <VideoItem key={videoId || "1"} data={data} />;
  };

  return (
    <div ref={containerRef} style={{ height: "400px", overflow: "auto" }}>
      {sharedVideoState.sharedVideoIds.map(renderItem)}
    </div>
  );
};

export default SharedVideoList;
