import { User } from '../../interfaces';
import { UserOutput } from '../../../db/models/User';

export const toUser = (user: UserOutput): User => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const toUserLite = (user: User | undefined): User | undefined => {
  if (user)
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
};

export const toUserLikesLite = (likes: User[] | undefined): any => {
  if (likes) {
    return likes.map(toUserLite);
  }
};
