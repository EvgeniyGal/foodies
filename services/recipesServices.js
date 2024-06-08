import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
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
    validateFilter['owner'] = owner;
  }
  const resp = await Recipe.find(validateFilter, fields, settings).populate([
    { path: 'owner', select: 'name avatar' },
    { path: 'category', select: 'name' },
    { path: 'area', select: 'name' },
    { path: 'ingredients.id', select: 'name img' },
  ]);
  return resp ? resp : null;
};

const recipeById = async id => {
  const resp = await Recipe.findById(id).populate([
    { path: 'owner', select: 'name avatar' },
    { path: 'category', select: 'name' },
    { path: 'area', select: 'name' },
    { path: 'ingredients.id', select: 'name img' },
  ]);
  return resp ? resp : null;
};

const recipeByFilter = async filter => {
  const resp = await Recipe.findOne(filter).populate([
    { path: 'owner', select: 'name avatar' },
    { path: 'category', select: 'name' },
    { path: 'area', select: 'name' },
    { path: 'ingredients.id', select: 'name img' },
  ]);
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

const getPopular = async (skip, limit = 10) => {
  const result = await User.aggregate([
    { $unwind: '$favRecipes' },
    { $group: { _id: '$favRecipes', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: '_id',
        as: 'recipe'
      }
    },
    { $unwind: '$recipe' },
    {
      $lookup: {
        from: 'users',
        localField: 'recipe.owner',
        foreignField: '_id',
        as: 'owner'
      }
    },
    { $unwind: '$owner' },
    {
      $project: {
        _id: 1,
        title: '$recipe.title',
        instructions: '$recipe.instructions',
        thumb: '$recipe.thumb',
        owner: { avatar: '$owner.avatar', name: '$owner.name' },
        count: 1,
      }
    }
  ]);

  return result;
}

export default {
  listRecipes,
  recipeById,
  recipeByFilter,
  createNewRecipe,
  deleteRecipeById,
  getPopular,
};
