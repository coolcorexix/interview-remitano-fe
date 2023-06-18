import { SharedVideoModels } from "../models/SharedVideoModels.tsx";

export interface SharedVideoState {
  sharedVideoIds: string[];
  sharedVideos: { [id: string]: SharedVideoModels };
}

export type SharedVideoAction =
  | { type: "ADD_SHARED_VIDEOS"; payload: SharedVideoModels[] }
  | { type: "CLEAR_SHARED_VIDEOS" };

export default function sharedVideoReducer(
  state: SharedVideoState,
  action: SharedVideoAction
): SharedVideoState {
  switch (action.type) {
    case "ADD_SHARED_VIDEOS": {
      const newSharedVideos: { [id: string]: SharedVideoModels } = {};
      const newSharedVideoIds: string[] = [];

      for (const video of action.payload) {
        if (!state.sharedVideos[video.id]) {
          newSharedVideoIds.push(video.id);
        }
        newSharedVideos[video.id] = video;
      }

      return {
        ...state,
        sharedVideoIds: [...state.sharedVideoIds, ...newSharedVideoIds],
        sharedVideos: { ...state.sharedVideos, ...newSharedVideos },
      };
    }
    case "CLEAR_SHARED_VIDEOS":
      return {
        sharedVideoIds: [],
        sharedVideos: {},
      };
    default:
      return state;
  }
}
