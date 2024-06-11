import express from 'express';
import { getAllCategories } from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get(
  '/',
  getAllCategories
  // #swagger.tags = ['Categories']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/categoriesResponse' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessage' }
        }   
    */
);

export default categoriesRouter;
