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

commentRouter.post('/post-comments', async (req: Request, res: Response) => {
  const post_id: number = req.body.post_id;

  const result = await commentController.getByPost(post_id);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

commentRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await commentController.getById(id);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

export default commentRouter;
