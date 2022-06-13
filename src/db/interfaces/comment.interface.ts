import { UserAttributes } from './user.interface';
import { CommentLikesAttributes } from './commentuser.interface';

export interface CommentAttributes {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  comment_author?: UserAttributes;
  comment_likes?: CommentLikesAttributes[];
}
