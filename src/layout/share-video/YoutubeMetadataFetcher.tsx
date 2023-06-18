import React, { useState } from 'react';

const YouTubeMetadataFetcher: React.FC = () => {
  const [url, setUrl] = useState('');
  const [metadata, setMetadata] = useState<any>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleShareClick = () => {
    const videoId = extractVideoId(url);

    // Fetch metadata using the YouTube Data API
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyANmhNRlVPDB1mFXm2KkCG-0jCLdOtrN-4`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: YoutubeMetadataFetcher.tsx:20 ~ .then ~ data:", data)
        const metadata = data.items[0].snippet;
        console.log("🚀 ~ file: YoutubeMetadataFetcher.tsx:22 ~ .then ~ metadata:", metadata)
        setMetadata(metadata);
      })
      .catch((error) => console.log(error));
  };

  const extractVideoId = (url: string): string => {
    // Extract video ID from the YouTube URL
    const match = url.match(
      /(?:\?v=|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|youtu\.be\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|youtube.com\/user\/\S+|youtube.com\/v\/\S+|youtube.com\/watch\?v=\S+|youtube.com\/embed\/\S+)/
    );
    return (match && match[0]) ? match[0].split(/(?:\?v=|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|youtu\.be\/|\/embed\/|\.be\/|\/v\/|\/\d{2}\/|youtube.com\/user\/|youtube.com\/v\/|youtube.com\/watch\?v=|youtube.com\/embed\/)/)[1] : '';
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleInputChange} />
      <button onClick={handleShareClick}>Share</button>
      {
        JSON.stringify(metadata)
      }
      {metadata && (
        <div>
          <h3>{metadata.title}</h3>
          <p>{metadata.description}</p>
        </div>
      )}
    </div>
  );
};

export default YouTubeMetadataFetcher;
