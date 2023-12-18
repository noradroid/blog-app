import { User } from '../user/user.model';

export type Post = {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  lastModifiedDate: string;
  user: User;
  active?: boolean;
};
