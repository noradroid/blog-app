import { User } from '../user/user.model';

export type Post = {
  id: number;
  title: string;
  description: string;
  content: string;
  createdDate: string;
  lastModifiedDate: string;
  user: User;
  imageId: number;
  active?: boolean;
};
