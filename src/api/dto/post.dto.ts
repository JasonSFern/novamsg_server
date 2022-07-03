import { Optional } from 'sequelize/types';

type Token = string | null | undefined;

export type CreatePostDTO = {
  user_id: number;
  content: string;
  token: Token;
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
