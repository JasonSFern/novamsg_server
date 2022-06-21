import { UserAttributes } from './user.interface';
import { PostLikesAttributes } from './postuser.interface';
import { CommentAttributes } from './comment.interface';
import { PostOutput } from '../models/Post';

export interface PostCommentsAttributes {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostAttributes {
  id: number;
  user_id: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: UserAttributes;
  post_likes?: PostLikesAttributes[];
  comments?: PostCommentsAttributes[];
}

export interface PaginatedPostOutput {
  rows: PostOutput[];
  count: number;
}
