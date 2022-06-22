import * as userDal from '../dal/user';
import { UserInput, UserOutput, PasswordChangeInput } from '../models/User';
import { verifyJwtSessionToken } from '../helpers/user-authentication';
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

export const updatePassword = async (
  id: number,
  payload: PasswordChangeInput
): Promise<UserOutput | Error> => {
  return userDal.updatePassword(id, payload);
};

export const verifyJwtToken = async (
  payload: string
): Promise<UserSessionOutput | Error> => {
  return verifyJwtSessionToken(payload);
};
