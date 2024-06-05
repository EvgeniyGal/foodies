import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import categoriesRouter from './routes/categoriesRouter.js';
import areasRouter from './routes/areasRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import testimonialsRouter from './routes/testimonialsRouter.js';
import usersRouter from './routes/usersRouter.js';
import recipesRouter from './routes/recipesRouter.js';
import invalidUrlError from './helpers/invalidUrlError.js';
import errorHandler from './helpers/errorHandler.js';

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
app.use('/recipes', recipesRouter);
app.use(invalidUrlError);
app.use(errorHandler);

export default app;
