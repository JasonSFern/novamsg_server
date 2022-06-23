import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/sequelize';

import { CommentUserAttributes } from '../interfaces/commentuser.interface';

export interface CommentUserInput extends CommentUserAttributes {}
export interface CommentUserOutput extends Required<CommentUserAttributes> {}

class CommentUser
  extends Model<CommentUserAttributes, CommentUserInput>
  implements CommentUserAttributes
{
  public comment_id!: number;
  public user_id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CommentUser.init(
  {
    comment_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  },
  {
    tableName: 'comment_users',
    sequelize: sequelizeConnection,
  }
);
CommentUser.removeAttribute('id');

export default CommentUser;
