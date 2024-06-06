import Joi from 'joi';

export const recipeAddSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().min(24).max(24).required(),
  area: Joi.string().min(24).max(24).required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array()
    .items({
      id: Joi.string().min(24).max(24).required(),
      measure: Joi.string().required(),
    })
    .required(),
  time: Joi.string().required(),
});
