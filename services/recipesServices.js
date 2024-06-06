import Recipe from '../models/Recipe.js';
import { Types } from 'mongoose';

const listRecipes = async (filter, fields, settings) => {
  const { category, area, ingredients, owner } = filter;
  let validateFilter = {};
  if (category) {
    validateFilter['category'] = category;
  }
  if (area) {
    validateFilter['area'] = area;
  }
  if (ingredients) {
    validateFilter['ingredients._id'] = {
      $in: [Types.ObjectId.createFromHexString(ingredients)],
    };
  }
  if (owner) {
    validateFilter['owner'] = owner;
  }
  const resp = await Recipe.find(validateFilter, fields, settings);
  return resp ? resp : null;
};

const recipeById = async id => {
  const resp = await Recipe.findById(id);
  return resp ? resp : null;
};

const recipeByFilter = async filter => {
  const resp = await Recipe.findOne(filter);
  return resp ? resp : null;
};

const createNewRecipe = async recipe => {
  const resp = await Recipe.create(recipe);
  return resp ? resp : null;
};

const deleteRecipeById = async id => {
  const resp = await Recipe.findOneAndDelete(filter);
  return resp ? resp : null;
};

export {
  listRecipes,
  recipeById,
  recipeByFilter,
  createNewRecipe,
  deleteRecipeById,
};
