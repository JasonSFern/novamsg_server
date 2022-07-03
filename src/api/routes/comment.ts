import { Router, Request, Response } from 'express';

import * as commentController from '../controllers/comment';
import { CreateCommentDTO, UpdateCommentDTO } from '../dto/comment.dto';
import { CommentLikesInput } from '../interfaces/comment.interface';

import { validateHuman } from '../lib/recaptcha-google-api';

const commentRouter = Router();

commentRouter.post('/', async (req: Request, res: Response) => {
  const payload: CreateCommentDTO = req.body;

  const human = await validateHuman(payload.token);

  if (!human) {
    return res.status(500).send("Please, you're not fooling us, bot.");
  }

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

commentRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: UpdateCommentDTO = req.body;

  const human = await validateHuman(payload.token);

  if (!human) {
    return res.status(500).send("Please, you're not fooling us, bot.");
  }

  const result = await commentController.update(id, payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(201).send(result);
});

commentRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await commentController.deleteById(id);

  return res.status(200).send({ success: true });
});

commentRouter.post('/toggle-like', async (req: Request, res: Response) => {
  const payload: CommentLikesInput = req.body;

  const result = await commentController.toggleLike(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

export default commentRouter;
