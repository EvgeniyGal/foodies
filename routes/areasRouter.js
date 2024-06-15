import express from 'express';
import { getAllAreas } from '../controllers/areasController.js';

const areasRouter = express.Router();

areasRouter.get(
  '/',
  getAllAreas
  // #swagger.tags = ['Areas']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/areasRes' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }   
    */
);

export default areasRouter;
