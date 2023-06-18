import YouTubeMetadataFetcherDialog from "./YouTubeMetadataFetcherDialog.tsx";
import { useState } from "react";
import Button from "@mui/material/Button";

function ShareVideoContainer() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button variant={"contained"} onClick={() => setOpen(true)} size="small">
        Share video
      </Button>
      <YouTubeMetadataFetcherDialog
        open={isOpen}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default ShareVideoContainer;
