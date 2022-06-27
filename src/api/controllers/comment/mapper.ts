import { Comment } from '../../interfaces';
import { CommentOutput } from '../../../db/models/Comment';

export const toComment = (comment: CommentOutput): Comment => {
  return {
    id: comment.id,
    user_id: comment.user_id,
    post_id: comment.post_id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    comment_author: comment.comment_author,
    comment_likes: comment.comment_likes,
  };
};
