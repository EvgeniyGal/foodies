import { getIngredients } from '../services/ingredientsServices.js';

export const getAllIngredients = async (_, res) => {
  res.json(await getIngredients());
};
