import * as service from '../../../db/services/UserService';
import { CreateUserDTO } from '../../dto/user.dto';

import { User } from '../../interfaces';
import * as mapper from './mapper';

export const create = async (payload: CreateUserDTO): Promise<User> => {
  return mapper.toUser(await service.create(payload));
};
