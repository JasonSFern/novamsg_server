import * as commentDal from '../dal/comment';
import { CommentInput, CommentOutput } from '../models/Comment';

export const create = async (
  payload: CommentInput
): Promise<CommentOutput | Error> => {
  return commentDal.create(payload);
};

export const getByPost = (
  post_id: number
): Promise<CommentOutput[] | Error> => {
  return commentDal.getByPost(post_id);
};
