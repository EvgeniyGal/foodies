import express from 'express';
import recipesController from '../controllers/recipesController.js';
import validateBody from '../decorators/validateBody.js';
import { recipeAddSchema } from '../schemas/recipeSchemas.js';
import authenticate from '../middleware/authenticate.js';
import { uploadRecipe } from '../middleware/upload.js';

//public routes

const recipesRouter = express.Router();

recipesRouter.get(
  '/',
  recipesController.getRecipesByFilter
  // #swagger.tags = ['Recipes']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipesRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Not found",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

recipesRouter.get(
  '/:id',
  recipesController.getRecipeById
  // #swagger.tags = ['Recipes']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipeRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Not found",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

recipesRouter.get(
  '/popular/list',
  recipesController.getPopularRecipes
  // #swagger.tags = ['Recipes']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipePopularRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Not found",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

recipesRouter.get(
  '/user/:id',
  recipesController.getUserRecipes
  // #swagger.tags = ['Recipes']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipeRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Not found",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

//private routes

recipesRouter.use(authenticate);

recipesRouter.get(
  '/personal/data',
  recipesController.getOwnRecipes
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Authenticated recipe route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipesRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Not found",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

recipesRouter.post(
  '/personal',
  uploadRecipe,
  validateBody(recipeAddSchema),
  recipesController.addRecipe
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Authenticated recipe route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/recipeReq"
                    }
                }
            }
        }
    */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipeRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

recipesRouter.delete(
  '/:id',
  recipesController.deleteRecipe
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Authenticated recipe route'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipeRes' }
        }
    */
  /* #swagger.responses[401] = {
            description: "Unauthorized",
            schema: { $ref: '#/components/schemas/unauthorizedRes' }
        }
    */
  /* #swagger.responses[404] = {
            description: "Not found",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }
    */
);

export default recipesRouter;
