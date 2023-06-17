import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { formatTimeAgo } from "src/utils";
import UserInfo from "src/features/users/components/UserInfo.tsx";
import { VideoModel } from "../models/VideoModel.tsx";

type VideoListItemProps = {
  data: VideoModel;
};

export default function VideoItem({ data }: VideoListItemProps) {
  const { image, views = 0, title, description, createdAt, publisher } = data;
  return (
    <>
      <Box sx={{ mt: 2 }} />
      <Card
        variant={"outlined"}
        sx={{ display: "flex", width: "100%", borderRadius: "16px" }}
      >
        <CardMedia
          component="img"
          sx={{ width: 360, height: 200 }}
          image={image}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {`${views} views - ${formatTimeAgo(createdAt)}`}
            </Typography>
            <UserInfo data={publisher} sx={{ mt: 1 }} />
            <Typography sx={{ mt: 1 }} component="div" variant="body2">
              {description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
