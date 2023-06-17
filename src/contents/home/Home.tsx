import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Header, Footer } from "../components";

import { CssBaseline } from "@mui/material";
import { BRAND_NAME } from "src/constants";
import VideoListItem from "../components/VideoList/VideoListItem.tsx";

const headerSections = [
  { title: "Youtube", url: "https://youtube.com/" },
  { title: "Remitano", url: "https://remitano.com/" },
];

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header sections={headerSections} title={BRAND_NAME} />

        {[1, 2, 3].map((index) => {
          return <VideoListItem />;
        })}

        <Box sx={{ my: 4 }}>
          <Footer
            description={"Fullstack Developer - Youtube Video Sharing App"}
            title={"Pham Huy Phat"}
          />
        </Box>
      </Container>
    </>
  );
}
