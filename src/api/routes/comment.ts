import { Router, Request, Response } from 'express';

import * as commentController from '../controllers/comment';
import { CreateCommentDTO, UpdateCommentDTO } from '../dto/comment.dto';

const commentRouter = Router();

commentRouter.post('/', async (req: Request, res: Response) => {
  const payload: CreateCommentDTO = req.body;

  const result = await commentController.create(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(201).send(result);
});

export default commentRouter;
