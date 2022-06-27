import { User } from './user.interface';

export interface CommentLikesAttributes extends User {
  comment_users: {
    comment_id: number;
    user_id: number;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  comment_author?: User;
  comment_likes?: CommentLikesAttributes[];
}

export interface CommentUser {
  comment_id: number;
  user_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommentLikesInput {
  user_id?: number;
  comment_id: number;
}
