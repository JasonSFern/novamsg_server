import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/sequelize';

import { UserAttributes } from '../interfaces/user.interface';
import { PostAttributes } from '../interfaces/post.interface';
import { PostLikesAttributes } from '../interfaces/postuser.interface';
import { CommentAttributes } from '../interfaces/comment.interface';

export interface PostInput extends Optional<PostAttributes, 'id'> {}
export interface PostOutput
  extends Optional<PostAttributes, 'author' | 'post_likes' | 'post_comments'> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id!: number;
  public user_id!: number;
  public content!: string;
  public author?: UserAttributes;
  public post_likes?: PostLikesAttributes[];
  public post_comments?: CommentAttributes[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'posts',
    sequelize: sequelizeConnection,
  }
);

export default Post;
