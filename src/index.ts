import dotenv from 'dotenv';

dotenv.config();

import express, { Express, Request, Response } from 'express';
import imagesRouter from './routes/imagesAnalyzerRoutes';
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/analyze', imagesRouter);

app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err);
  return res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(
    `[server]: Server is running at http://localhost:${port}. Enjoy!`
  );
});

