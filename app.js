import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import categoriesRouter from './routes/categoriesRouter.js';
import areasRouter from './routes/areasRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import testimonialsRouter from './routes/testimonialsRouter.js';
import recipesRouter from './routes/recipesRouter.js';
import { db } from './db.js';

const { NODE_ENV, PORT } = process.env;

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/categories', categoriesRouter);
app.use('/areas', areasRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/recipes', recipesRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

if (NODE_ENV === 'prod' || NODE_ENV === 'dev') {
  await db();

  app.listen(PORT || 3000, () => {
    console.log(`App running. Use our API on port: ${PORT || 3000}`);
  });
}

export default app;
