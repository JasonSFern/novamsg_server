import * as userDal from '../dal/user';
import { UserInput, UserOutput } from '../models/User';

export const create = async (payload: UserInput): Promise<UserOutput> => {
  return userDal.create(payload);
};
