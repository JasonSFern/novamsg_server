require('dotenv').config();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dbInit from './db/init';

dbInit();

const serverPort = process.env.SERVER_PORT;
const clientPort = process.env.CLIENT_PORT;

export const get = () => {
  const app: Application = express();

  app.use(express.json());
  app.use(
    cors({
      origin: [`http://localhost:${clientPort}`],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );
  app.use(express.urlencoded({ extended: true }));

  app.get('/', async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: `Nova.msg API is now online! \n Endpoints available at http://localhost:${serverPort}/api/v1`,
    });
  });

  return app;
};

export const start = () => {
  const app = get();
  try {
    app.listen(serverPort, () => {
      console.log(`Server running on http://localhost:${serverPort}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

start();
