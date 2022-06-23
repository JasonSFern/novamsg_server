import { UserAttributes } from './user.interface';
import { PostLikesAttributes } from './postuser.interface';
import { PostOutput } from '../models/Post';
import { Optional } from 'sequelize/types';

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

export interface PaginatedUserPostInput {
  user_id: number;
  limit: number;
  offset: number;
  order: string;
}

export interface PaginatedPostInput
  extends Optional<PaginatedUserPostInput, 'user_id'> {}

export interface PaginatedPostOutput {
  rows: PostOutput[];
  count: number;
}
