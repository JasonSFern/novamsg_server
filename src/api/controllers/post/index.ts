import { PostUserOutput } from '../../../db/models/PostUser';
import * as service from '../../../db/services/PostService';
import {
  CreatePostDTO,
  PaginatedPostsDTO,
  PaginatedUserPostsDTO,
  UpdatePostDTO,
} from '../../dto/post.dto';

import { Post, PaginatedPost, PostLikesInput } from '../../interfaces';
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

export const deleteById = async (id: number): Promise<boolean> => {
  const isDeleted = await service.deleteById(id);

  return isDeleted;
};

export const toggleLike = async (
  payload: PostLikesInput
): Promise<PostUserOutput[]> => {
  const result = await service.toggleLike(payload);

  return result;
};
