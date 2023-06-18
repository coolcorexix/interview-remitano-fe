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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value.trim();
    setUrl(url);
    setUrlError(!isYouTubeUrl(url));
    // if event target value is a url then trigger handleShareClick
    if (url.includes("youtube.com") || url.includes("youtube")) {
      fetchMetadata();
    }
  };

  const fetchMetadata = () => {
    const videoId = extractVideoId(url);

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
    // Extract video ID from the YouTube URL
    const match = url.match(
      /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|youtu\.be\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|youtube.com\/user\/\S+|youtube.com\/v\/\S+|youtube.com\/watch\?v=\S+|youtube.com\/embed\/\S+)/
    );
    return match && match[0]
      ? match[0].split(
          /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|youtu\.be\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|youtube.com\/user\/|youtube.com\/v\/|youtube.com\/watch\?v=|youtube.com\/embed\/)/
        )[1]
      : "";
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
            );
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
