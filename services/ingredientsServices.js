import Ingredient from '../models/Ingredient.js';

export const getIngredients = () => {
  return Ingredient.find();
};
