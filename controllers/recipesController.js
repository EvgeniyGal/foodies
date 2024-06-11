import recipesServices from '../services/recipesServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import responseWrapper from '../decorators/responseWrapper.js';
import resizer from '../helpers/resizer.js';
import fs from 'fs/promises';
import path from 'path';
import HttpError from '../helpers/HttpError.js';

const recipePath = path.resolve('public', 'recipes');

const getRecipesByFilter = async (req, res) => {
  const { page = 1, limit = 20, category, area, ingredients } = req.query;
  const filter = { category, area, ingredients };
  const fields = '';
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const allRecipes = await recipesServices.listRecipes(
    filter,
    fields,
    settings
  );
  responseWrapper(allRecipes, 404, res, 200);
};
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesServices.recipeById(id);
  responseWrapper(recipe, 404, res, 200);
};

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, category, area, ingredients } = req.query;
  const filter = { category, area, ingredients, owner };
  const fields = '';
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const allRecipes = await recipesServices.listRecipes(
    filter,
    fields,
    settings
  );
  responseWrapper(allRecipes, 404, res, 200);
};

const addRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  if (!req.file) {
    throw HttpError(401, 'File not found');
  }
  const {
    title,
    category,
    area,
    instructions,
    description,
    time,
    ingredients,
  } = req.body;

  const { path: tmpPath, filename } = req.file;
  await resizer(tmpPath, { h: 400, w: 550 });
  const newPath = path.join(recipePath, filename);
  await fs.rename(tmpPath, newPath);
  const recipeURL = path.join('recipes', filename);

  const recipe = await recipesServices.createNewRecipe({
    title,
    category,
    area,
    instructions,
    description,
    thumb: recipeURL,
    time,
    ingredients,
    owner,
  });
  responseWrapper(recipe, 404, res, 201);
};

const deleteRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const filter = { _id: id, owner };
  const recipe = await recipesServices.deleteRecipeById(filter);
  responseWrapper(recipe, 404, res, 200);
};

const getPopularRecipes = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await recipesServices.getPopular(skip, limit);
  responseWrapper(result, 404, res, 200);
};

const getUserRecipes = async (req, res) => {
  const { id: owner } = req.params;
  const filter = { owner };
  const fields = '';
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const result = await recipesServices.listRecipes(filter, fields, settings);
  responseWrapper(result, 404, res, 200);
};

export default {
  getRecipesByFilter: ctrlWrapper(getRecipesByFilter),
  getRecipeById: ctrlWrapper(getRecipeById),
  getOwnRecipes: ctrlWrapper(getOwnRecipes),
  addRecipe: ctrlWrapper(addRecipe),
  deleteRecipe: ctrlWrapper(deleteRecipe),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
  getUserRecipes: ctrlWrapper(getUserRecipes),
};
