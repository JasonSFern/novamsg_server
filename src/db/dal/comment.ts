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

export const update = async (
  id: number,
  payload: Partial<CommentInput>
): Promise<CommentOutput | Error> => {
  const comment = await Comment.findByPk(id);

  if (!comment) return new Error('Comment to edit was not found');

  if (comment.user_id != payload.user_id)
    return new Error(
      'User editing comment is not the original author. Changes have not been saved'
    );

  return await comment.update(payload);
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
