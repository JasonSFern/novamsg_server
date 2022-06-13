import { User } from '../models';
import { UserInput, UserOutput } from '../models/User';

import { hashPassword } from '../helpers/password';

export const create = async (payload: UserInput): Promise<UserOutput> => {
  const { username, password } = payload;
  const hp = hashPassword(password);
  const exists = await User.findOne({ where: { username: username } });

  if (exists) {
    throw new Error('Username is already in use. Please try another username');
  } else {
    payload.password = hp;

    const user = await User.create(payload);
    return user;
  }
};
