import * as service from '../../../db/services/PostService';
import {
  CreatePostDTO,
  PaginatedPostsDTO,
  PaginatedUserPostsDTO,
  UpdatePostDTO,
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

export const getById = async (id: number): Promise<Post | Error> => {
  const result = await service.getById(id);

  if (result instanceof Error) {
    return result;
  }

  return mapper.toPost(result);
};

export const create = async (payload: CreatePostDTO): Promise<Post | Error> => {
  const result = await service.create(payload);

  if (result instanceof Error) {
    return result;
  }

  return mapper.toPost(result);
};

export const update = async (
  id: number,
  payload: UpdatePostDTO
): Promise<Post | Error> => {
  const result = await service.update(id, payload);

  if (result instanceof Error) {
    return result;
  }

  return mapper.toPost(result);
};
