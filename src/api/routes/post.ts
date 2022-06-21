import { Router, Request, Response } from 'express';

import * as postController from '../controllers/post';
import { CreatePostDTO, UpdatePostDTO } from '../dto/post.dto';

const postRouter = Router();

// Get all posts with pagination
postRouter.post('/all-posts', async (req: Request, res: Response) => {
  const limit: number = req.body.limit ? parseInt(req.body.limit) : 5;
  const offset: number = req.body.offset ? parseInt(req.body.offset) : 0;
  const order: string = req.body.order ? req.body.order : 'desc';

  const result = await postController.getAllPaginate(limit, offset, order);

  if (result instanceof Error) {
    return res.status(500).send(result.message);
  }

  return res.status(200).send(result);
});

export default postRouter;
