import recipesServices from '../services/recipesServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import responseWrapper from '../decorators/responseWrapper.js';
import HttpError from '../helpers/HttpError.js';
import cloudinary from '../helpers/cloudinary.js';
import fs from 'fs/promises';

const RECIPES_FOLDER = 'recipes';

const getRecipesByFilter = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    category,
    area,
    ingredients,
    userId,
  } = req.query;
  const filter = { category, area, ingredients, userId };
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
  const { userId } = req.query;
  const recipe = await recipesServices.recipeById(id, userId);
  responseWrapper(recipe, 404, res, 200);
};

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, category, area, ingredients } = req.query;
  const filter = { category, area, ingredients, owner, userId: owner };
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
    throw HttpError(400, 'File not found');
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

  const { path: tmpPath } = req.file;
  const { url } = await cloudinary.uploadImage(tmpPath, RECIPES_FOLDER, {
    h: 400,
    w: 550,
  });
  await fs.unlink(tmpPath);
  const recipe = await recipesServices.createNewRecipe({
    title,
    category,
    area,
    instructions,
    description,
    thumb: url,
    time,
    ingredients,
    owner,
  });
  responseWrapper(recipe, 400, res, 201);
};

const deleteRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const filter = { recipeId: id, owner };
  const recipeBefore = await recipesServices.recipeById(id);
  const { status } = await recipesServices.deleteRecipeById(filter);
  if (status === 'Ok') {
    await cloudinary.deleteImageByUrl(recipeBefore.thumb, RECIPES_FOLDER);
  }
  responseWrapper({ message: status }, 404, res, 200);
};

const getPopularRecipes = async (req, res) => {
  const { page = 1, limit = 20, userId } = req.query;
  const skip = (page - 1) * limit;
  const result = await recipesServices.getPopular({ skip, limit, userId });
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
