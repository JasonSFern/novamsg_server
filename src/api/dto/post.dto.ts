import { Optional } from 'sequelize/types';

export type CreatePostDTO = {
  user_id: number;
  content: string;
};

export type UpdatePostDTO = CreatePostDTO;
