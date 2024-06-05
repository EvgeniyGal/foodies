import {
  listRecipes,
  recipeById,
  deleteRecipeById,
  createNewRecipe,
} from '../services/recipesServices.js';
import validateBody from '../decorators/validateBody.js';
import { errorHandling } from '../decorators/errorHandling.js';
import { recipeAddSchema } from '../schemas/recipeSchemas.js';
import responseWrapper from '../decorators/responseWrapper.js';
import {
  listFavorites,
  addFavorite,
  deleteFavorite,
  listPopular,
} from '../services/favoriteServices.js';

const getRecipesByFilter = async (req, res) => {
  const { category, area, ingredients } = req.body;
  const filter = { category, area, ingredients };
  const fields = '';
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const allRecipes = await listRecipes(filter, fields, settings);
  responseWrapper(allRecipes, 404, res, 200);
};
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeById(id);
  responseWrapper(recipe, 404, res, 200);
};

const getOwnRecipes = async (req, res) => {
  //const { _id: owner } = req.user; // temporary until implement auth
  const owner = '64c8d958249fae54bae90bb9'; // temporary until implement auth
  const { category, area, ingredients } = req.body;
  const filter = { category, area, ingredients, owner };
  const fields = '';
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const allRecipes = await listRecipes(filter, fields, settings);
  responseWrapper(allRecipes, 404, res, 200);
};

const addRecipe = async (req, res, next) => {
  const validate = validateBody(recipeAddSchema);
  await validate(req, res, next);

  //const { _id: owner } = req.user; // temporary until implement auth
  const owner = '64c8d958249fae54bae90bb7'; // temporary until implement auth
  const {
    title,
    category,
    area,
    instructions,
    description,
    thumb,
    time,
    ingredients,
  } = req.body;

  const recipe = await createNewRecipe({
    title,
    category,
    area,
    instructions,
    description,
    thumb,
    time,
    ingredients,
    owner,
  });
  responseWrapper(recipe, 404, res, 201);
};

const deleteRecipe = async (req, res) => {
  //const { _id: owner } = req.user; // temporary until implement auth
  const owner = '64c8d958249fae54bae90bb7'; // temporary until implement auth
  const { id } = req.params;
  const filter = { _id: id, owner };
  const recipe = await deleteRecipeById(filter);
  responseWrapper(recipe, 404, res, 200);
};

const likeRecipe = async (req, res, next) => {
  //const { _id: user } = req.user;
  const user = '64c8d958249fae54bae90bb7'; // temporary until implement auth
  const { id } = req.params;
  const filter = { recipe: id, user };
  const recipe = await addFavorite(filter);
  responseWrapper(recipe, 404, res, 200);
};

const unlikeRecipe = async (req, res, next) => {
  //const { _id: user } = req.user;
  const user = '64c8d958249fae54bae90bb7'; // temporary until implement auth
  const { id } = req.params;
  const filter = { recipe: id, user };
  const recipe = await deleteFavorite(filter);
  responseWrapper(recipe, 404, res, 200);
};

const getFavoriteRecipes = async (req, res) => {
  //const { _id: user } = req.user;
  const user = '64c8d958249fae54bae90bb8'; // temporary until implement auth
  const filter = { user };
  const fields = '';
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const allRecipes = await listFavorites(filter, fields, settings);
  responseWrapper(allRecipes, 404, res, 200);
};

const getPopularRecipes = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const allRecipes = await listPopular(settings);
  responseWrapper(allRecipes, 404, res, 200);
};

export default {
  getRecipesByFilter: errorHandling(getRecipesByFilter),
  getRecipeById: errorHandling(getRecipeById),
  getOwnRecipes: errorHandling(getOwnRecipes),
  addRecipe: errorHandling(addRecipe),
  deleteRecipe: errorHandling(deleteRecipe),
  likeRecipe: errorHandling(likeRecipe),
  unlikeRecipe: errorHandling(unlikeRecipe),
  getFavoriteRecipes: errorHandling(getFavoriteRecipes),
  getPopularRecipes: errorHandling(getPopularRecipes),
};
