import express from 'express';
import recipesController from '../controllers/recipesController.js';
import validateBody from '../decorators/validateBody.js';
import { recipeAddSchema } from '../schemas/recipeSchemas.js';
import authenticate from '../middleware/authenticate.js';
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
  validateBody(recipeAddSchema),
  recipesController.addRecipe
);

recipesRouter.get('/favorite/list', recipesController.getFavoriteRecipes);

recipesRouter.delete('/:id', recipesController.deleteRecipe);

recipesRouter.patch('/:id/like', recipesController.likeRecipe);

recipesRouter.patch('/:id/unlike', recipesController.unlikeRecipe);

export default recipesRouter;
