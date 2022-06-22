import { PaginatedPostOutput } from '../interfaces/post.interface';
import { Post, User, Comment } from '../models';
import { PostInput, PostOutput } from '../models/Post';

export const getAllPaginate = async (
  limit: number,
  offset: number,
  order: string
): Promise<PaginatedPostOutput | Error> => {
  const posts = await Post.findAndCountAll({
    include: [
      {
        model: User,
        as: 'author',
      },
      {
        model: User,
        as: 'post_likes',
      },
      {
        model: Comment,
        as: 'comments',
      },
    ],
    limit: limit,
    offset: offset,
    distinct: true,
    order: [['updatedAt', order]],
  });

  if (posts) {
    return posts;
  } else {
    return new Error('Unable to fetch posts.');
  }
};

export const create = async (
  payload: PostInput
): Promise<PostOutput | Error> => {
  const post = await Post.create(payload);

  if (post) {
    return post;
  } else {
    return new Error('Unable to create post.');
  }
};
