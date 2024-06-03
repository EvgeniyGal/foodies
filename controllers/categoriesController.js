import { getCategories } from '../services/categoriesServices.js';

export const getAllCategories = async (_, res) => {
  res.json(await getCategories());
};
