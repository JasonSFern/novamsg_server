import * as commentDal from '../dal/comment';
import { CommentInput, CommentOutput } from '../models/Comment';

export const getById = (id: number): Promise<CommentOutput | Error> => {
  return commentDal.getById(id);
};

export const create = async (
  payload: CommentInput
): Promise<CommentOutput | Error> => {
  return commentDal.create(payload);
};

export const update = async (
  id: number,
  payload: Partial<CommentInput>
): Promise<CommentOutput | Error> => {
  return commentDal.update(id, payload);
};

export const getByPost = (
  post_id: number
): Promise<CommentOutput[] | Error> => {
  return commentDal.getByPost(post_id);
};
