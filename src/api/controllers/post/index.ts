import * as service from '../../../db/services/PostService';
import { CreatePostDTO } from '../../dto/post.dto';

import { Post, PaginatedPost } from '../../interfaces';
import * as mapper from './mapper';

export const getAllPaginate = async (
  limit: number,
  offset: number,
  order: string
): Promise<PaginatedPost | Error> => {
  console.log(limit, offset, order);
  const result = await service.getAllPaginate(limit, offset, order);

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
