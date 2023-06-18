import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { formatTimeAgo, numberToReadableString } from "src/utils";

import { SharedVideoModels } from "../models/SharedVideoModels.tsx";
import YouTube, { YouTubeProps } from "react-youtube";
import { useState } from "react";
import { CardMedia } from "@mui/material";

type VideoListItemProps = {
  data: SharedVideoModels;
};

const opts: YouTubeProps["opts"] = {
  height: "200",
  width: "360",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
export default function VideoItem({ data }: VideoListItemProps) {
  const { video, shared_at, shared_by } = data;
  const { statistics, snippet, id } = video;
  const [ready, setReady] = useState(false);
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    setReady(true);
  };

  function renderYoutube() {
    return (
      <Box
        sx={{
          width: 360,
          minWidth: 360,
          height: 200,
          borderRadius: "16px",
          position: "relative",
        }}
      >
        <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />;
        {!ready && (
          <CardMedia
            component="img"
            sx={{
              width: 360,
              minWidth: 360,
              height: 200,
              borderRadius: "16px",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            image={snippet?.thumbnails?.medium?.url}
          />
        )}
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mt: 2 }} />
      <Card
        variant={"outlined"}
        sx={{
          display: "flex",
          width: "100%",
          borderColor: "white",
          maxHeight: 200,
        }}
      >
        {renderYoutube()}

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {snippet?.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" component="div">
              <b>{snippet?.channelTitle}</b>{" "}
              {` published ${formatTimeAgo(Date.parse(snippet.publishedAt))}`}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}></Box>
            <Typography variant="body2" color="text.secondary" component="div">
              <b>{shared_by?.display_name}</b>{" "}
              {` shared ${formatTimeAgo(shared_at)}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {numberToReadableString(statistics?.viewCount)} views -{" "}
              {numberToReadableString(statistics?.likeCount)} likes -{" "}
              {numberToReadableString(statistics?.commentCount)} comments
            </Typography>

            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                mt: 1,
              }}
              component="div"
              variant="body2"
            >
              {snippet?.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
