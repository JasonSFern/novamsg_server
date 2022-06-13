import { UserAttributes } from './user.interface';
import { PostLikesAttributes } from './postuser.interface';
import { CommentAttributes } from './comment.interface';

export interface PostAttributes {
  id: number;
  user_id: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  author?: UserAttributes;
  post_likes?: PostLikesAttributes[];
  post_comments?: CommentAttributes[];
}
