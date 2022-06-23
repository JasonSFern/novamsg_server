import { Comment } from '../models';
import { CommentInput, CommentOutput } from '../models/Comment';

export const create = async (
  payload: CommentInput
): Promise<CommentOutput | Error> => {
  const comment = await Comment.create(payload);

  if (comment) {
    return comment;
  } else {
    return new Error('Unable to create comment.');
  }
};
