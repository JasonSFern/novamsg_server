import { Comment, User } from '../../interfaces';
import { CommentOutput } from '../../../db/models/Comment';

import { toUserLite, toUserLikesLite } from '../user/mapper';

export const toComment = (comment: CommentOutput): Comment => {
  return {
    id: comment.id,
    user_id: comment.user_id,
    post_id: comment.post_id,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    comment_author: toUserLite(comment.comment_author),
    comment_likes: toUserLikesLite(comment.comment_likes),
  };
};
