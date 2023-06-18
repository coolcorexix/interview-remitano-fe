import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Header, Footer } from "../components";

import { CssBaseline } from "@mui/material";
import { BRAND_NAME } from "src/constants";
import { VideoItem } from "src/features/videos";
import { VideoModel } from "src/features/videos/models/VideoModel.tsx";
import NotificationStackProvider from "src/features/notifications/components/NotificationStackProvider.tsx";

const video: VideoModel = {
  id: "v123456",
  image:
    "https://i.ytimg.com/vi/0kOV0vBsaoE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAmbbeuWASy2rVZM3eZO6icYS1j2Q",
  title: "Cooking Masterclass: Homemade Pizza",
  description:
    "Learn how to make the perfect homemade pizza with our step-by-step cooking masterclass.",
  createdAt: 1678802400,
  publisher: {
    id: "user789",
    name: "ChefErika",
    avatar: "",
  },
};

export default function Home() {
  function renderVideo() {
    return <VideoItem data={video} />;
  }

  return (
    <>
      <NotificationStackProvider>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title={BRAND_NAME} />
          {[1, 2, 3].map(renderVideo)}
          <Box sx={{ my: 4 }}>
            <Footer
              description={
                "Fullstack Developer - Youtube VideoModel Sharing App"
              }
              title={"Pham Huy Phat"}
            />
          </Box>
        </Container>
      </NotificationStackProvider>
    </>
  );
}
