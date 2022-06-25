import * as postDal from '../dal/post';
import {
  PaginatedPostInput,
  PaginatedPostOutput,
  PaginatedUserPostInput,
} from '../interfaces/post.interface';
import { PostInput, PostOutput } from '../models/Post';

export const getAllPaginate = (
  payload: PaginatedPostInput
): Promise<PaginatedPostOutput | Error> => {
  return postDal.getAllPaginate(payload.limit, payload.offset, payload.order);
};

export const getByUserPaginate = (
  payload: PaginatedUserPostInput
): Promise<PaginatedPostOutput | Error> => {
  return postDal.getByUserPaginate(
    payload.user_id,
    payload.limit,
    payload.offset,
    payload.order
  );
};

export const getById = (id: number): Promise<PostOutput | Error> => {
  return postDal.getById(id);
};

export const create = async (
  payload: PostInput
): Promise<PostOutput | Error> => {
  return postDal.create(payload);
};

export const update = async (
  id: number,
  payload: Partial<PostInput>
): Promise<PostOutput | Error> => {
  return postDal.update(id, payload);
};
