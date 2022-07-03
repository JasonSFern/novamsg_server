import { Router, Request, Response } from 'express';

import * as postController from '../controllers/post';
import {
  CreatePostDTO,
  UpdatePostDTO,
  PaginatedPostsDTO,
  PaginatedUserPostsDTO,
} from '../dto/post.dto';
import { PostLikesInput } from '../interfaces';

import { validateHuman } from '../lib/recaptcha-google-api';

const postRouter = Router();

// Get all posts with pagination
postRouter.post('/all-posts', async (req: Request, res: Response) => {
  const payload: PaginatedPostsDTO = {
    limit: req.body.limit ? parseInt(req.body.limit) : 5,
    offset: req.body.offset ? parseInt(req.body.offset) : 0,
    order: req.body.order ? req.body.order : 'desc',
  };

  const result = await postController.getAllPaginate(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

postRouter.post('/user-posts', async (req: Request, res: Response) => {
  const payload: PaginatedUserPostsDTO = {
    user_id: parseInt(req.body.user_id),
    limit: req.body.limit ? parseInt(req.body.limit) : 5,
    offset: req.body.offset ? parseInt(req.body.offset) : 0,
    order: req.body.order ? req.body.order : 'desc',
  };

  const result = await postController.getByUserPaginate(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

postRouter.post('/', async (req: Request, res: Response) => {
  const payload: CreatePostDTO = req.body;

  const human = await validateHuman(payload.token);

  if (!human) {
    return res.status(500).send("Please, you're not fooling us, bot.");
  }

  const result = await postController.create(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(201).send(result);
});

postRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await postController.getById(id);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

postRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: UpdatePostDTO = req.body;

  const human = await validateHuman(payload.token);

  if (!human) {
    return res.status(500).send("Please, you're not fooling us, bot.");
  }

  const result = await postController.update(id, payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(201).send(result);
});

postRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await postController.deleteById(id);

  return res.status(200).send({ success: true });
});

postRouter.post('/toggle-like', async (req: Request, res: Response) => {
  const payload: PostLikesInput = req.body;

  const result = await postController.toggleLike(payload);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

export default postRouter;
