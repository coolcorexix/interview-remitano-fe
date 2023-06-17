import { UserModel } from "src/features/users/models/UserModel.tsx";

export type VideoModel = {
  id: string;
  image: string;
  title: string;
  description: string;
  createdAt: number;
  views: number;
  publisher: UserModel;
};
