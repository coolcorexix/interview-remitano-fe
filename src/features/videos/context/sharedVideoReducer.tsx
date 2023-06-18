import { SharedVideoModel } from "../models/SharedVideoModel.tsx";

export interface SharedVideoState {
  sharedVideoIds: string[];
  sharedVideos: { [id: string]: SharedVideoModel };
}

export type SharedVideoAction =
  | { type: "ADD_SHARED_VIDEO"; payload: SharedVideoModel }
  | { type: "ADD_SHARED_VIDEOS"; payload: SharedVideoModel[] }
  | { type: "CLEAR_SHARED_VIDEOS" };

export default function sharedVideoReducer(
  state: SharedVideoState,
  action: SharedVideoAction
): SharedVideoState {
  switch (action.type) {
    case "ADD_SHARED_VIDEOS": {
      return {
        ...state,
        sharedVideoIds: [
          ...state.sharedVideoIds,
          ...action.payload.map((video) => video.id),
        ],
        sharedVideos: {
          ...state.sharedVideos,
          ...action.payload.reduce(
            (acc, video) => ({ ...acc, [video.id]: video }),
            {}
          ),
        },
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
