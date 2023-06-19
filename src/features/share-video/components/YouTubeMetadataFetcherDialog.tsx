import React, { useState } from "react";
import requestToServer, {
  getAuthHeaders,
} from "src/services/requestToServer.ts";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { isYouTubeUrl } from "src/utils";
import { useSharedVideo } from "src/features/videos";

interface YouTubeMetadataFetcherDialogProps {
  open: boolean;
  onClose: () => void;
}

const YouTubeMetadataFetcherDialog: React.FC<
  YouTubeMetadataFetcherDialogProps
> = ({ open, onClose }) => {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<any>(null);
  const { clearSharedVideos } = useSharedVideo();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedUrl = event.target.value.trim();
    setUrl(trimmedUrl);
    setUrlError(!isYouTubeUrl(trimmedUrl));
    // if event target value is a url then trigger handleShareClick
    if (trimmedUrl.includes("youtube.com") || trimmedUrl.includes("youtube")) {
      fetchMetadata(trimmedUrl);
    }
  };

  const fetchMetadata = (inputUrl: string) => {
    const videoId = extractVideoId(inputUrl);

    // Fetch metadata using the YouTube Data API
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyANmhNRlVPDB1mFXm2KkCG-0jCLdOtrN-4`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "🚀 ~ file: YoutubeMetadataFetcher.tsx:20 ~ .then ~ data:",
          data
        );
        const metadata = {
          id: data.items[0].id,
          ...data.items[0].snippet,
        };
        console.log(
          "🚀 ~ file: YoutubeMetadataFetcher.tsx:22 ~ .then ~ metadata:",
          metadata
        );
        setMetadata(metadata);
      })
      .catch((error) => console.log(error));
  };

  const extractVideoId = (url: string): string => {
    
    // get video url from query v parameter
    const videoUrl = new URL(url);
    const videoId = videoUrl.searchParams.get("v");
    
    return videoId || '';

  };

  function handleClose() {
    onClose && onClose();
  }

  return (
    <Dialog maxWidth={"md"} fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle>Share Youtube url</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="link"
          label="Youtube url"
          type="url"
          fullWidth
          variant="standard"
          defaultValue="Enter valid Youtube url"
          helperText="Invalid Youtube url"
          onChange={handleInputChange}
          value={url}
          error={urlError}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant={"contained"}
          onClick={() => {
            requestToServer.post(
              "/videos/share/create",
              { video_id: metadata.id },
              { headers: getAuthHeaders() }
            ).then(() => {
              clearSharedVideos();
            });
            handleClose();
          }}
        >
          Share
        </Button>
        {metadata && (
          <div>
            <h3>{metadata.title}</h3>
            <p>{metadata.description}</p>
          </div>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default YouTubeMetadataFetcherDialog;
