import { UserModel } from "src/features/users/models/UserModel.tsx";

interface SnippetModel {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
}

interface StatisticsModel {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}

export interface SharedVideoModel {
  id: string;
  shared_at: number;
  shared_by: UserModel;
  video: {
    etag: string;
    id: string;
    kind: string;
    snippet: SnippetModel;
    statistics: StatisticsModel;
  };
}
