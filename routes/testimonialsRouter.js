import express from 'express';
import { getAllTestimonials } from '../controllers/testimonialsController.js';

const testimonialsRouter = express.Router();

testimonialsRouter.get(
  '/',
  getAllTestimonials
  // #swagger.tags = ['Testimonials']
  /* #swagger.responses[200] = {
            description: "OK",
            schema: { $ref: '#/components/schemas/testimonialsRes' }
        }   
    */
  /* #swagger.responses[404] = {
            description: "Bad request",
            schema: { $ref: '#/components/schemas/errorMessageRes' }
        }   
    */
);

export default testimonialsRouter;
