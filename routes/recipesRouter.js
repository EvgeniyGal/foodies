import express from 'express';
import recipesController from '../controllers/recipesController.js';
import validateBody from '../decorators/validateBody.js';
import { recipeAddSchema } from '../schemas/recipeSchemas.js';
import authenticate from '../middleware/authenticate.js';
import { uploadRecipe } from '../middleware/upload.js';

//public routes

const recipesRouter = express.Router();

recipesRouter.get('/', recipesController.getRecipesByFilter);

recipesRouter.get('/:id', recipesController.getRecipeById);

recipesRouter.get('/popular/list', recipesController.getPopularRecipes);

//private routes

recipesRouter.use(authenticate);

recipesRouter.get('/personal/data', recipesController.getOwnRecipes);

recipesRouter.post(
  '/personal',
  uploadRecipe,
  validateBody(recipeAddSchema),
  recipesController.addRecipe
);

recipesRouter.delete('/:id', recipesController.deleteRecipe);

export default recipesRouter;
