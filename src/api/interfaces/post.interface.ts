import { User } from './user.interface';

export interface PostLikes extends User {
  post_users: {
    createdAt: Date;
    updatedAt: Date;
    post_id: number;
    user_id: number;
  };
}

export interface PostComments {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  user_id: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: User;
  post_likes?: number;
  comments?: number;
}

export interface PaginatedPost {
  rows: Post[];
  count: number;
}
