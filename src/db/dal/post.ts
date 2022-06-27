import { PaginatedPostOutput } from '../interfaces/post.interface';
import { PostLikesInput } from '../interfaces/postuser.interface';
import { Post, User, Comment } from '../models';
import { PostInput, PostOutput } from '../models/Post';
import PostUser, { PostUserOutput } from '../models/PostUser';

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

export const getByUserPaginate = async (
  user_id: number,
  limit: number,
  offset: number,
  order: string
): Promise<PaginatedPostOutput | Error> => {
  if (user_id) {
    return Post.findAndCountAll({
      where: { user_id: 2 },
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
  } else {
    return new Error(
      'Unable to fetch posts for user. Invalid user id provided'
    );
  }
};

export const getById = async (id: number): Promise<PostOutput | Error> => {
  const post = await Post.findAll({
    where: { id: id },
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
  });

  console.log(post);

  if (!post) {
    throw new Error('Post not found');
  }

  return post[0];
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

export const update = async (
  id: number,
  payload: Partial<PostInput>
): Promise<PostOutput | Error> => {
  const post = await Post.findByPk(id);

  if (!post) return new Error('Post to edit was not found');

  if (post.user_id != payload.user_id)
    return new Error(
      'User editing post is not the original author. Changes have not been saved'
    );

  return await post.update(payload);
};

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedPost = await Post.destroy({
    where: { id },
  });

  return !!numDeletedPost;
};

export const toggleLike = async (
  payload: PostLikesInput
): Promise<PostUserOutput[]> => {
  const { post_id } = payload;

  if (payload.user_id) {
    const { user_id } = payload;
    const post_user = await PostUser.findOne({
      where: { post_id, user_id },
      attributes: { exclude: ['id'] },
    });

    if (post_user) {
      const like = await PostUser.destroy({
        where: { post_id, user_id },
      });
    } else {
      const like = await PostUser.create({
        post_id,
        user_id,
      });
    }
  }

  return await PostUser.findAll({
    where: { post_id },
  });
};
