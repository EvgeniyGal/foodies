import categoriesServices from '../services/categoriesServices.js';

export const getAllCategories = async (_, res) => {
  const categories = await categoriesServices.getCategories();
  res.json(categories);
};
