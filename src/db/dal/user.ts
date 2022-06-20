import { User } from '../models';
import { UserInput, UserOutput, PasswordChangeInput } from '../models/User';

import {
  hashPassword,
  matchPassword,
  encodeSession,
  packageUserSession,
} from '../helpers/user-authentication';

import { UserSessionOutput } from '../interfaces/user.interface';

const jwtSecret: string = process.env.JWT_SECRET_KEY
  ? process.env.JWT_SECRET_KEY
  : 'default_key';

export const create = async (
  payload: UserInput
): Promise<UserOutput | Error> => {
  const { username, password } = payload;
  const hp = hashPassword(password);
  const exists = await User.findOne({ where: { username: username } });

  if (exists) {
    return new Error('Username is already in use. Please try another username');
  } else {
    payload.password = hp;

    const user = await User.create(payload);
    return user;
  }
};

export const login = async (
  payload: UserInput
): Promise<UserSessionOutput | Error> => {
  const { username, password } = payload;
  const user = await User.findOne({ where: { username: username } });

  if (!user) {
    return new Error('User not found');
  } else {
    const match = matchPassword(password, user.password);

    if (match) {
      const { id, username, email } = user;

      const session = encodeSession(jwtSecret, {
        user_data: { id, email, username },
        dateCreated: Date.now(),
      });

      const response: UserSessionOutput = packageUserSession(
        true,
        200,
        'You have been successfully logged in',
        session
      );

      return response;
    } else {
      return new Error('Wrong username and password combination provided!');
    }
  }
};

export const updatePassword = async (
  id: number,
  payload: PasswordChangeInput
): Promise<UserOutput | Error> => {
  const { current_password, new_password } = payload;
  const user = await User.findByPk(id);
  // console.log(user);
  if (!user) {
    // todo: throw custom error/error handling
    return new Error('User not found');
  } else {
    const hp = hashPassword(new_password);
    const mp = matchPassword(current_password, user.password);
    // console.log('match: ', mp);
    // console.log('hash: ', hp);

    let updatedUser: UserOutput;

    if (mp) {
      updatedUser = await user.update({ password: hp });
    } else {
      // updatedUser = user;
      throw new Error('Wrong current password provided!');
    }

    return updatedUser;
  }
};
