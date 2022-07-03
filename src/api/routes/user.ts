import { Router, Request, Response } from 'express';

import * as userController from '../controllers/user';
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserPasswordDTO,
} from '../dto/user.dto';

import { validateHuman } from '../lib/recaptcha-google-api';

const userRouter = Router();

// Create new user
userRouter.post('/register', async (req: Request, res: Response) => {
  const payload: CreateUserDTO = req.body;

  const human = await validateHuman(payload.token);

  if (!human) {
    return res.status(500).send("Please, you're not fooling us, bot.");
  }

  const result = await userController.create(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(201).send(result);
});

// Verify user ccredentials for login
userRouter.post('/login', async (req: Request, res: Response) => {
  const payload: LoginUserDTO = req.body;

  const human = await validateHuman(payload.token);

  if (!human) {
    return res.status(500).send("Please, you're not fooling us, bot.");
  }

  const result = await userController.login(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

// Change user password. Possibly expand later to change the email as well
userRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: UpdateUserPasswordDTO = req.body;

  const human = await validateHuman(payload.token);

  if (!human) {
    return res.status(500).send("Please, you're not fooling us, bot.");
  }

  const result = await userController.updatePassword(id, payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(201).send(result);
});

// Verify that the session token is still valid and renew if applicable
userRouter.post('/verify-token', async (req: Request, res: Response) => {
  const token = req.headers['x-jwt-token'];

  if (token && typeof token === 'string') {
    const result = await userController.verifyJwtToken(token);

    if (result instanceof Error) {
      return res.status(500).send(result.message);
    }

    return res.status(200).send(result);
  } else {
    return res.status(500).send({ auth: false, message: 'no token provided' });
  }
});

export default userRouter;
