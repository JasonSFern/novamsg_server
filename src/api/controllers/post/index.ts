import * as service from '../../../db/services/PostService';
import {
  CreatePostDTO,
  PaginatedPostsDTO,
  PaginatedUserPostsDTO,
} from '../../dto/post.dto';

import { Post, PaginatedPost } from '../../interfaces';
import * as mapper from './mapper';

export const getAllPaginate = async (
  payload: PaginatedPostsDTO
): Promise<PaginatedPost | Error> => {
  const result = await service.getAllPaginate(payload);

  if (result instanceof Error) {
    return result;
  }

  let mappedPosts: PaginatedPost = {
    count: result.count,
    rows: result.rows.map(mapper.toPost),
  };

  return mappedPosts;
};

export const getByUserPaginate = async (
  payload: PaginatedUserPostsDTO
): Promise<PaginatedPost | Error> => {
  const result = await service.getByUserPaginate(payload);

  if (result instanceof Error) {
    return result;
  }

  let mappedPosts: PaginatedPost = {
    count: result.count,
    rows: result.rows.map(mapper.toPost),
  };

  return mappedPosts;
};

export const create = async (payload: CreatePostDTO): Promise<Post | Error> => {
  const result = await service.create(payload);

  if (result instanceof Error) {
    return result;
  }

  return mapper.toPost(result);
};
