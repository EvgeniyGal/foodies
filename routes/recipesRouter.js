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
            schema: { $ref: '#/components/schemas/recipesResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

recipesRouter.get(
  '/:id',
  recipesController.getRecipeById
  // #swagger.tags = ['Recipes']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipeResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

recipesRouter.get(
  '/popular/list',
  recipesController.getPopularRecipes
  // #swagger.tags = ['Recipes']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userRecipesResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

recipesRouter.get(
  '/user/:id',
  recipesController.getUserRecipes
  // #swagger.tags = ['Recipes']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipeResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

//private routes

recipesRouter.use(authenticate);

recipesRouter.get(
  '/personal/data',
  recipesController.getOwnRecipes
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/userRecipesResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

recipesRouter.post(
  '/personal',
  uploadRecipe,
  validateBody(recipeAddSchema),
  recipesController.addRecipe
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Authenticated user route'
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/recipeBody"
                    }  
                }
            }
        } 
    */
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipeResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

recipesRouter.delete(
  '/:id',
  recipesController.deleteRecipe
  // #swagger.tags = ['Recipes']
  // #swagger.description = 'Authenticated user route'
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/recipeResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

export default recipesRouter;
