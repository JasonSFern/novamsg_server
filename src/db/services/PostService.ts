import * as postDal from '../dal/post';
import { PaginatedPostOutput } from '../interfaces/post.interface';

export const getAllPaginate = (
  limit: number,
  offset: number,
  order: string
): Promise<PaginatedPostOutput | Error> => {
  return postDal.getAllPaginate(limit, offset, order);
};
