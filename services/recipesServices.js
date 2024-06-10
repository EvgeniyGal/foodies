import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import { Types, set } from 'mongoose';

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

  const total = await Recipe.countDocuments(validateFilter);
  if (total === 0 || total <= settings.skip) {
    return null;
  }

  const resp = await Recipe.find(validateFilter, fields, settings).populate([
    { path: 'owner', select: 'name avatar' },
    { path: 'category', select: 'name' },
    { path: 'area', select: 'name' },
    { path: 'ingredients.id', select: 'name img' },
  ]);
  return resp ? { total, ...resp } : null;
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

const createNewRecipe = async recipe => {
  const resp = await Recipe.create(recipe);
  return resp ? resp : null;
};

const deleteRecipeById = async filter => {
  const resp = await Recipe.findOneAndDelete(filter);
  return resp ? resp : null;
};

const getPopular = async (skip, limit) => {
  const totalResults = await User.aggregate([
    { $unwind: '$favRecipes' },
    { $group: { _id: '$favRecipes', count: { $sum: 1 } } },
    { $count: 'total' },
  ]);

  const total = totalResults.length > 0 ? totalResults[0].total : 0;

  if (total === 0 || total <= skip) {
    return null;
  }

  const resp = await User.aggregate([
    { $unwind: '$favRecipes' },
    { $group: { _id: '$favRecipes', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $skip: skip },
    { $limit: parseInt(limit) },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: '_id',
        as: 'recipe',
      },
    },
    { $unwind: '$recipe' },
    {
      $lookup: {
        from: 'users',
        localField: 'recipe.owner',
        foreignField: '_id',
        as: 'owner',
      },
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
      },
    },
  ]);

  return resp ? { total, ...resp } : null;
};

export default {
  listRecipes,
  recipeById,
  createNewRecipe,
  deleteRecipeById,
  getPopular,
};
