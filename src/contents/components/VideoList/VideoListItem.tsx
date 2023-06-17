import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Divider } from "@mui/material";

import { red } from "@mui/material/colors";

export default function VideoListItem() {
  return (
    <>
      <Box sx={{ mt: 2 }} />
      <Card
        sx={{
          display: "flex",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 360, height: 200 }}
          image="https://i.ytimg.com/vi/0kOV0vBsaoE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAmbbeuWASy2rVZM3eZO6icYS1j2Q"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Root Begins Series with Century! | Highlights - England v
              Australia Day 1 | LV= Insurance Test 2023
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              56K views - 23h ago
            </Typography>
            <Box sx={{ display: "flex", alignItems: "flex-start", mt: 1 }}>
              <Avatar
                sx={{ bgcolor: red[500], width: 18, height: 18 }}
                aria-label="recipe"
              >
                R
              </Avatar>
              <Divider orientation={"vertical"} light={true} />
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                sx={{ ml: 1 }}
              >
                Nemo
              </Typography>
            </Box>
            <Typography sx={{ mt: 1 }} component="div" variant="body2">
              Full Transcript Bookmarks Root Begins Series with Century! |
              Highlights - England v Australia Day 1 | LV= Insurance Test 2023
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
