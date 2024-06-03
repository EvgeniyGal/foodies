import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import categoriesRouter from './routes/categoriesRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import { db } from './db.js';

dotenv.config({ path: path.resolve('.env.general') });

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/categories', categoriesRouter);

app.use('/ingredients', ingredientsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'dev') {
  await db();

  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `App running. Use our API on port: ${process.env.PORT || 3000}`
    );
  });
}
