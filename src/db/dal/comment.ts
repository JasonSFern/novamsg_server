import { Comment, User } from '../models';
import { CommentInput, CommentOutput } from '../models/Comment';

export const getById = async (id: number): Promise<CommentOutput | Error> => {
  const comment = await Comment.findByPk(id);

  if (!comment) {
    throw new Error('Comment not found');
  }

  return comment;
};

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

export const getByPost = async (
  post_id: number
): Promise<CommentOutput[] | Error> => {
  return Comment.findAll({
    where: { post_id: post_id },
    include: [
      {
        model: User,
        as: 'comment_author',
      },
      {
        model: User,
        as: 'comment_likes',
      },
    ],
  });
};
