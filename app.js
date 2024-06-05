import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import categoriesRouter from './routes/categoriesRouter.js';
import areasRouter from './routes/areasRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import testimonialsRouter from './routes/testimonialsRouter.js';
import usersRouter from './routes/usersRouter.js';
import { db } from './db.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/areas', areasRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/testimonials', testimonialsRouter);

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
