import * as userDal from '../dal/user';
import { UserInput, UserOutput } from '../models/User';

import { UserSessionOutput } from '../interfaces/user.interface';

export const create = async (
  payload: UserInput
): Promise<UserOutput | Error> => {
  return userDal.create(payload);
};

export const login = async (
  payload: UserInput
): Promise<UserSessionOutput | Error> => {
  return userDal.login(payload);
};
