import User from './User';
import Post from './Post';
import Comment from './Comment';
import CommentUser from './CommentUser';
import PostUser from './PostUser';

Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'post_author',
});
Post.belongsToMany(User, {
  foreignKey: 'post_id',
  otherKey: 'user_id',
  through: 'post_users',
  as: 'post_likes',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'comment_author',
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post_comments',
});
Comment.belongsToMany(User, {
  foreignKey: 'comment_id',
  otherKey: 'user_id',
  through: 'comment_users',
  as: 'comment_likes',
});

export { User, Post, Comment, CommentUser, PostUser };
