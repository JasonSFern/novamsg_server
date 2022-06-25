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

export const update = async (
  id: number,
  payload: UpdateCommentDTO
): Promise<Comment | Error> => {
  const result = await service.update(id, payload);

  if (result instanceof Error) {
    return result;
  }

  return mapper.toComment(result);
};

export const deleteById = async (id: number): Promise<boolean> => {
  const isDeleted = await service.deleteById(id);

  return isDeleted;
};

export const getByPost = async (
  post_id: number
): Promise<Comment[] | Error> => {
  const result = await service.getByPost(post_id);

  if (result instanceof Error) {
    return result;
  }

  return result.map(mapper.toComment);
};

export const getById = async (id: number): Promise<Comment | Error> => {
  const result = await service.getById(id);

  if (result instanceof Error) {
    return result;
  }

  return mapper.toComment(result);
};
