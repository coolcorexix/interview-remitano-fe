import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Header, Footer } from "../components";

import { CssBaseline } from "@mui/material";
import { BRAND_NAME } from "src/constants";
import { SharedVideoProvider } from "src/features/videos";
import SharedVideoListContainer from "../../features/videos/components/SharedVideoContainer.tsx";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <SharedVideoProvider>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title={BRAND_NAME} />
          <SharedVideoListContainer />
          <Box sx={{ my: 4 }}>
            <Footer
              description={
                "Fullstack Developer - Youtube VideoModel Sharing App"
              }
              title={"Pham Huy Phat"}
            />
          </Box>
        </Container>
      </SharedVideoProvider>
    </>
  );
}
