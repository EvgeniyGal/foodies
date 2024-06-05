import express from 'express';
import recipesController from '../controllers/recipesController.js';

//public routes

const recipesRouter = express.Router();

recipesRouter.get('/', recipesController.getRecipesByFilter);

recipesRouter.get('/:id', recipesController.getRecipeById);

recipesRouter.get('/popular/list', recipesController.getPopularRecipes);

//private routes

recipesRouter.get('/personal/data', recipesController.getOwnRecipes);

recipesRouter.post('/personal', recipesController.addRecipe);

recipesRouter.get('/favorite/list', recipesController.getFavoriteRecipes);

recipesRouter.delete('/:id', recipesController.deleteRecipe);

recipesRouter.patch('/:id/like', recipesController.likeRecipe);

recipesRouter.patch('/:id/unlike', recipesController.unlikeRecipe);

export default recipesRouter;
