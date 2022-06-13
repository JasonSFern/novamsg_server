import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/sequelize';

import { UserAttributes } from '../interfaces/user.interface';
import { CommentAttributes } from '../interfaces/comment.interface';
import { CommentLikesAttributes } from '../interfaces/commentuser.interface';

export interface CommentInput extends Optional<CommentAttributes, 'id'> {}
export interface CommentOutput
  extends Optional<CommentAttributes, 'comment_author' | 'comment_likes'> {}

class Comment
  extends Model<CommentAttributes, CommentInput>
  implements CommentAttributes
{
  public id!: number;
  public user_id!: number;
  public post_id!: number;
  public content!: string;
  public comment_author?: UserAttributes;
  public comment_likes?: CommentLikesAttributes[];

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'comments',
    sequelize: sequelizeConnection,
  }
);

export default Comment;
