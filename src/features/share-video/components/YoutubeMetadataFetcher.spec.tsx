import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import YouTubeMetadataFetcherDialog from "./YouTubeMetadataFetcherDialog.tsx";
import { debug } from "jest-preview";

describe("YouTubeMetadataFetcher", () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetches and displays metadata correctly", async () => {
    const mockMetadata = {
      title: "Test Video",
      description: "This is a test video",
    };

    const mockResponse = {
      items: [{ snippet: mockMetadata }],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    render(<YouTubeMetadataFetcherDialog onClose={() => {}} open={true} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    fireEvent.change(input, {
      target: { value: "https://www.youtube.com/watch?v=abc123" },
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(fetchMock.mock.calls[0][0]).toBe(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=abc123&key=AIzaSyANmhNRlVPDB1mFXm2KkCG-0jCLdOtrN-4"
      );
    });

    const jsonPromise: Promise<Response> = Promise.resolve(
      new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { "Content-type": "application/json" },
      })
    );
    const json = (await jsonPromise).json();

    fetchMock.mockReturnValueOnce(jsonPromise);

    await waitFor(() => {
      expect(json).resolves.toEqual(mockResponse);
    });

    debug();

    const titleElement = screen.getByText("Test Video", { selector: "h3" });
    const descriptionElement = screen.getByText("This is a test video");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
  afterAll(() => {
    fetchMock.disableMocks();
  });
});
