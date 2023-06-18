import { UserModels } from "src/features/users/models/UserModels.tsx";

export interface SnippetModel {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
}

export interface StatisticsModel {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}

export interface SharedVideoModels {
  id: string;
  shared_at: number;
  shared_by: UserModels;
  video: {
    etag: string;
    id: string;
    kind: string;
    snippet: SnippetModel;
    statistics: StatisticsModel;
  };
}
