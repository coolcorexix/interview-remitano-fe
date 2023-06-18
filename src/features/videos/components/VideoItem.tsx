import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { formatTimeAgo } from "src/utils";
import UserInfo from "src/features/users/components/UserInfo.tsx";
import { SharedVideoModels } from "../models/SharedVideoModels.tsx";

type VideoListItemProps = {
  data: SharedVideoModels;
};

export default function VideoItem({ data }: VideoListItemProps) {
  const { video, shared_at, shared_by } = data;
  const { statistics } = video;
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
          image={""}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {""}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {`${statistics?.viewCount || 0} views - ${formatTimeAgo(
                shared_at
              )}`}
            </Typography>
            <UserInfo data={shared_by} sx={{ mt: 1 }} />
            <Typography sx={{ mt: 1 }} component="div" variant="body2">
              {""}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
