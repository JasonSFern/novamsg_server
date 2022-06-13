import { UserAttributes } from './user.interface';

export interface CommentUserAttributes {
  comment_id: number;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentLikesAttributes extends UserAttributes {
  comment_users: CommentUserAttributes;
}
