import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import VideoItem from "./VideoItem";

describe("VideoItem", () => {
  const sharedVideoMock = {
    id: "abc123",
    shared_at: 1624000000, // Example timestamp (UNIX timestamp in seconds)
    shared_by: {
      id: "user123",
      email: "user@example.com",
      display_name: "John Doe",
    },
    video: {
      etag: "xyz789",
      id: "video123",
      kind: "youtube#video",
      snippet: {
        categoryId: "22",
        channelId: "channel123",
        channelTitle: "Test Channel",
        description: "This is a test video",
        liveBroadcastContent: "none",
        title: "Test Video",
        tags: ["tag1", "tag2"],
        publishedAt: "2021-06-01T00:00:00Z",
        thumbnails: [
          {
            url: "https://example.com/thumbnail.jpg",
            width: 120,
            height: 90,
          },
        ],
      },
      statistics: {
        commentCount: "10",
        favoriteCount: "5",
        likeCount: "20",
        viewCount: "100",
      },
    },
  };

  it("renders video details correctly", () => {
    render(<VideoItem data={sharedVideoMock} />);

    // Assert video title
    const titleElement = screen.getByText("Test Video");
    expect(titleElement).toBeInTheDocument();

    // Assert video channel title
    const channelTitleElement = screen.getByText("Test Channel");
    expect(channelTitleElement).toBeInTheDocument();

    // Assert video description
    const descriptionElement = screen.getByText("This is a test video");
    expect(descriptionElement).toBeInTheDocument();

    // Assert other video details like view count, like count, etc.
    // Add additional assertions as needed based on your UI structure
  });
});
