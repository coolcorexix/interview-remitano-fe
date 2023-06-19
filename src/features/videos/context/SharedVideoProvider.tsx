import React, { createContext, useContext, useReducer, useState } from "react";
import VideoAPI from "../VideoAPI.tsx";
import sharedVideoReducer, { SharedVideoState } from "./sharedVideoReducer.tsx";

interface SharedVideoContextType {
  sharedVideoState: SharedVideoState;
  clearSharedVideos: () => void;
  getSharedVideos: (pageIndex?: number, pageSize?: number) => void;
}

const SharedVideoContext = createContext<SharedVideoContextType | undefined>(
  undefined
);

const SharedVideoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: SharedVideoState = {
    sharedVideoIds: [],
    sharedVideos: {},
  };

  const [state, dispatch] = useReducer(sharedVideoReducer, initialState);
  const [lastPageIndex, setLastPageIndex] = useState(0);

  const getSharedVideos = async () => {
    try {
      const videos = await VideoAPI.getAll({
        pageIndex: lastPageIndex,
      });

      dispatch({ type: "ADD_SHARED_VIDEOS", payload: videos });
      setLastPageIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error getSharedVideos: pageIndex=" + lastPageIndex, error);
    }
  };

  const clearSharedVideos = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch({ type: "CLEAR_SHARED_VIDEOS", payload: null });
    setLastPageIndex(0);
  };

  return (
    <SharedVideoContext.Provider
      value={{
        sharedVideoState: state,
        clearSharedVideos,
        getSharedVideos,
      }}
    >
      {children}
    </SharedVideoContext.Provider>
  );
};

const useSharedVideo = (): SharedVideoContextType => {
  const context = useContext(SharedVideoContext);
  if (!context) {
    throw new Error(
      "useSharedVideo must be used inside of SharedVideoProvider"
    );
  }
  return context;
};

export { SharedVideoProvider, useSharedVideo };
