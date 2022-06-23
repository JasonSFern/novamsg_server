import { Optional } from 'sequelize/types';

export type CreatePostDTO = {
  user_id: number;
  content: string;
};

export type UpdatePostDTO = CreatePostDTO;

export type PaginatedPostsDTO = {
  limit: number;
  offset: number;
  order: string;
};

export type PaginatedUserPostsDTO = {
  user_id: number;
  limit: number;
  offset: number;
  order: string;
};
