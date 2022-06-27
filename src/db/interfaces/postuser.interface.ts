import { UserAttributes } from './user.interface';

export interface PostUserAttributes {
  post_id: number;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostLikesAttributes extends UserAttributes {
  post_users: {
    createdAt: Date;
    updatedAt: Date;
    post_id: number;
    user_id: number;
  };
}

export interface PostLikesInput {
  user_id?: number;
  post_id: number;
}
