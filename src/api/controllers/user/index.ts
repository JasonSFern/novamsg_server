import * as service from '../../../db/services/UserService';
import { CreateUserDTO, LoginUserDTO } from '../../dto/user.dto';

import { User, UserSession } from '../../interfaces';
import * as mapper from './mapper';

export const create = async (payload: CreateUserDTO): Promise<User | Error> => {
  const result = await service.create(payload);

  if (result instanceof Error) {
    return result;
  }

  return mapper.toUser(result);
};

export const login = async (
  payload: LoginUserDTO
): Promise<UserSession | Error> => {
  return await service.login(payload);
};
