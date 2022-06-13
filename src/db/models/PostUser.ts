import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config/sequelize';

import { PostUserAttributes } from '../interfaces/postuser.interface';

export interface PostUserInput
  extends Optional<PostUserAttributes, 'post_id'> {}
export interface PostUserOutput extends Required<PostUserAttributes> {}

class PostUser
  extends Model<PostUserAttributes, PostUserInput>
  implements PostUserAttributes
{
  public post_id!: number;
  public user_id!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PostUser.init(
  {
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  },
  {
    tableName: 'post_users',
    sequelize: sequelizeConnection,
  }
);
PostUser.removeAttribute('id');

export default PostUser;
