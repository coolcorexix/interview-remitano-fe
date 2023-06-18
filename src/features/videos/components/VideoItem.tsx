import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { formatTimeAgo } from "src/utils";

import { SharedVideoModels } from "../models/SharedVideoModels.tsx";

type VideoListItemProps = {
  data: SharedVideoModels;
};

export default function VideoItem({ data }: VideoListItemProps) {
  const { video, shared_at, shared_by } = data;
  const { statistics, snippet } = video;

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
        <CardMedia
          component="img"
          sx={{
            width: 360,
            minWidth: 360,
            height: 200,
            borderRadius: "16px",
          }}
          image={snippet?.thumbnails?.medium?.url}
        />
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
              {statistics?.viewCount || 0} views - {statistics?.likeCount || 0}{" "}
              likes - {statistics?.commentCount || 0} comments
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
