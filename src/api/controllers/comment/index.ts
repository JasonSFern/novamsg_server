import * as service from '../../../db/services/CommentService';
import { CreateCommentDTO, UpdateCommentDTO } from '../../dto/comment.dto';
import { Comment } from '../../interfaces';
import * as mapper from './mapper';

export const create = async (
  payload: CreateCommentDTO
): Promise<Comment | Error> => {
  const result = await service.create(payload);

  if (result instanceof Error) {
    return result;
  }
  return mapper.toComment(result);
};

export const getByPost = async (
  post_id: number
): Promise<Comment[] | Error> => {
  const result = await service.getByPost(post_id);
  // result.rows = comments.rows.map(mapper.toComment);

  return result;
};
