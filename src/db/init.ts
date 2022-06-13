require('dotenv').config();

import { CommentUser, PostUser, Comment, Post, User } from './models';

const dbInit = () =>
  Promise.all([
    User.sync({ alter: false }),
    Post.sync({ alter: false }),
    PostUser.sync({ alter: false }),
    Comment.sync({ alter: false }),
    CommentUser.sync({ alter: false }),
  ]);

export default dbInit;
