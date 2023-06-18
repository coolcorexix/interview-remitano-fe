import requestToServer from "src/services/requestToServer.ts";
import { SharedVideoModel } from "./models/SharedVideoModel.tsx";

interface GetAllParams {
  pageIndex?: number;
  pageSize?: number;
}

class VideoAPI {
  static async getAll({ pageIndex = 0, pageSize = 10 }: GetAllParams = {}) {
    try {
      const url = `/videos/share/list?page=${pageIndex}&page_size=${pageSize}`;
      const res = await requestToServer.get(url);
      return res.data as SharedVideoModel[];
    } catch (e) {
      console.error("getAll Error:", e);
      throw new Error("getAll Error");
    }
  }
}

export default VideoAPI;
