import { Post, PostComments } from '../../interfaces';
import { PostOutput } from '../../../db/models/Post';

import { toUserLite, toUserLikesLite } from '../user/mapper';
import { count } from '../../../db/helpers/count';

export const toPost = (post: PostOutput): Post => {
  return {
    id: post.id,
    user_id: post.user_id,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    author: toUserLite(post.author),
    post_likes: toUserLikesLite(post.post_likes),
    comments: count<PostComments>(post.comments),
  };
};
