export type Post = {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  lastModifiedDate: string;
  userId: string;
  active?: boolean;
};
