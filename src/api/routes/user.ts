import { Router, Request, Response } from 'express';

import * as userController from '../controllers/user';
import { CreateUserDTO, LoginUserDTO } from '../dto/user.dto';

const userRouter = Router();

// Create new user
userRouter.post('/register', async (req: Request, res: Response) => {
  const payload: CreateUserDTO = req.body;

  const result = await userController.create(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

// Verify user ccredentials for login
userRouter.post('/login', async (req: Request, res: Response) => {
  const payload: LoginUserDTO = req.body;

  const result = await userController.login(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

export default userRouter;
