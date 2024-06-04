import express from 'express';
import recipesController from '../controllers/recipesController.js';

//public routes

const recipesRouter = express.Router();

recipesRouter.get('/', recipesController.getRecipesByFilter);

recipesRouter.get('/:id', recipesController.getRecipeById);

// recipesRouter.get('/popular', getPopularRecipes);

//private routes

recipesRouter.get('/personal/data', recipesController.getOwnRecipes);

recipesRouter.post('/personal', recipesController.addRecipe);

recipesRouter.delete('/:id', recipesController.deleteRecipe);

// recipesRouter.patch('/:id/like', likeRecipe);

// recipesRouter.get('/favorite', getFavoriteRecipes);

export default recipesRouter;
