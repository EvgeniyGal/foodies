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
    validateFilter['ingredients.id'] = {
      $in: [Types.ObjectId.createFromHexString(ingredients)],
    };
  }
  if (owner) {
    validateFilter['owner'] = Types.ObjectId.createFromHexString(owner);
  }
  return await Recipe.find(validateFilter, fields, settings);
};

const recipeById = async id => await Recipe.findById(id);

const recipeByFilter = async filter => await Recipe.findOne(filter);

const createNewRecipe = async recipe => await Recipe.create(recipe);

const deleteRecipeById = async id => await Recipe.findByIdAndDelete(id);

export {
  listRecipes,
  recipeById,
  recipeByFilter,
  createNewRecipe,
  deleteRecipeById,
};
