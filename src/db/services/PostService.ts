import * as postDal from '../dal/post';
import { PaginatedPostOutput } from '../interfaces/post.interface';
import { PostInput, PostOutput } from '../models/Post';

export const getAllPaginate = (
  limit: number,
  offset: number,
  order: string
): Promise<PaginatedPostOutput | Error> => {
  return postDal.getAllPaginate(limit, offset, order);
};

export const create = async (
  payload: PostInput
): Promise<PostOutput | Error> => {
  return postDal.create(payload);
};
