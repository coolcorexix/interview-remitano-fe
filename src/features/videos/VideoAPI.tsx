import requestToServer from "src/services/requestToServer.ts";
import { SharedVideoModels } from "./models/SharedVideoModels.tsx";

interface GetAllParams {
  pageIndex?: number;
  pageSize?: number;
}

class VideoAPI {
  static async getAll({ pageIndex = 0, pageSize = 100 }: GetAllParams = {}) {
    try {
      const url = `/videos/share/list?page=${pageIndex}&page_size=${pageSize}`;
      const res = await requestToServer.get(url);
      const data = res.data as SharedVideoModels[];
      console.log("GET " + url, data);
      return data;
    } catch (e) {
      console.error("getAll Error:", e);
      return [];
    }
  }
}

export default VideoAPI;
