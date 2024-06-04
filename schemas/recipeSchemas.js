import Joi from 'joi';

export const recipeAddSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  thumb: Joi.string().required(),
  ingredients: Joi.array()
    .items({ id: Joi.string().required(), measure: Joi.string().required() })
    .required(),
  time: Joi.string().required(),
});
