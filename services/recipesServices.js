import HttpError from '../helpers/HttpError.js';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const zeroResp = { message: 'No recipes found', total: 0, recipes: [] };
const listRecipes = async (filter, _, settings) => {
  const { category, area, ingredients, owner, userId = null } = filter;
  let validateFilter = {};
  if (category) {
    validateFilter['category'] =
      mongoose.Types.ObjectId.createFromHexString(category);
  }
  if (area) {
    validateFilter['area'] = mongoose.Types.ObjectId.createFromHexString(area);
  }
  if (ingredients) {
    validateFilter['ingredients.id'] = {
      $in: [mongoose.Types.ObjectId.createFromHexString(ingredients)],
    };
  }
  if (owner) {
    validateFilter['owner'] =
      mongoose.Types.ObjectId.createFromHexString(owner);
  }

  const total = await Recipe.countDocuments(validateFilter);
  if (total === 0) {
    return zeroResp;
  } else if (total <= settings.skip) {
    zeroResp.total = total;
  }

  const pipeline = [
    { $match: validateFilter },
    { $skip: settings.skip },
    { $limit: parseInt(settings.limit) },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
        pipeline: [{ $project: { name: 1, avatar: 1 } }],
      },
    },
    { $unwind: '$owner' },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    { $unwind: '$category' },
    {
      $lookup: {
        from: 'areas',
        localField: 'area',
        foreignField: '_id',
        as: 'area',
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    { $unwind: '$area' },
    {
      $lookup: {
        from: 'ingredients',
        localField: 'ingredients.ingredient',
        foreignField: '_id',
        as: 'ingredientsData',
      },
    },
    {
      $addFields: {
        ingredients: {
          $map: {
            input: '$ingredients',
            as: 'ing',
            in: {
              ingredient: {
                $arrayElemAt: [
                  '$ingredientsData',
                  {
                    $indexOfArray: ['$ingredientsData._id', '$$ing.ingredient'],
                  },
                ],
              },
              measure: '$$ing.measure',
            },
          },
        },
      },
    },
  ];

  if (userId) {
    pipeline.push(
      {
        $lookup: {
          from: 'users',
          let: {
            recipeId: '$_id',
            userId: mongoose.Types.ObjectId.createFromHexString(userId),
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$_id', '$$userId'] },
                    { $in: ['$$recipeId', '$favRecipes'] },
                  ],
                },
              },
            },
            { $count: 'isFavorite' },
          ],
          as: 'userFavorite',
        },
      },
      {
        $addFields: {
          isFavorite: {
            $cond: {
              if: { $gt: [{ $size: '$userFavorite' }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          owner: 1,
          area: 1,
          instructions: 1,
          description: 1,
          thumb: 1,
          time: 1,
          ingredients: 1,
          createdAt: 1,
          updatedAt: 1,
          isFavorite: 1,
        },
      }
    );
  } else {
    pipeline.push(
      {
        $addFields: {
          isFavorite: false,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          owner: 1,
          area: 1,
          instructions: 1,
          description: 1,
          thumb: 1,
          time: 1,
          ingredients: 1,
          createdAt: 1,
          updatedAt: 1,
          isFavorite: 1,
        },
      }
    );
  }

  const resp = await Recipe.aggregate(pipeline);

  return resp ? { total, recipes: resp } : zeroResp;
};

const recipeById = async (id, userId) => {
  const pipeline = [
    { $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) } },
    {
      $lookup: {
        from: 'users',
        localField: 'owner',
        foreignField: '_id',
        as: 'owner',
        pipeline: [{ $project: { name: 1, avatar: 1 } }],
      },
    },
    { $unwind: '$owner' },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    { $unwind: '$category' },
    {
      $lookup: {
        from: 'areas',
        localField: 'area',
        foreignField: '_id',
        as: 'area',
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    { $unwind: '$area' },
    {
      $lookup: {
        from: 'ingredients',
        localField: 'ingredients.ingredient',
        foreignField: '_id',
        as: 'ingredientsData',
      },
    },
    {
      $addFields: {
        ingredients: {
          $map: {
            input: '$ingredients',
            as: 'ing',
            in: {
              ingredient: {
                $arrayElemAt: [
                  '$ingredientsData',
                  {
                    $indexOfArray: ['$ingredientsData._id', '$$ing.ingredient'],
                  },
                ],
              },
              measure: '$$ing.measure',
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        category: 1,
        owner: 1,
        area: 1,
        instructions: 1,
        description: 1,
        thumb: 1,
        time: 1,
        ingredients: 1,
        isFavorite: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];

  if (userId) {
    pipeline.push(
      {
        $lookup: {
          from: 'users',
          let: {
            recipeId: '$_id',
            userId: mongoose.Types.ObjectId.createFromHexString(userId),
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$_id', '$$userId'] },
                    { $in: ['$$recipeId', '$favRecipes'] },
                  ],
                },
              },
            },
            { $count: 'isFavorite' },
          ],
          as: 'userFavorite',
        },
      },
      {
        $addFields: {
          isFavorite: {
            $cond: {
              if: { $gt: [{ $size: '$userFavorite' }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          owner: 1,
          area: 1,
          instructions: 1,
          description: 1,
          thumb: 1,
          time: 1,
          ingredients: 1,
          createdAt: 1,
          updatedAt: 1,
          isFavorite: 1,
        },
      }
    );
  } else {
    pipeline.push(
      {
        $addFields: {
          isFavorite: false,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          owner: 1,
          area: 1,
          instructions: 1,
          description: 1,
          thumb: 1,
          time: 1,
          ingredients: 1,
          createdAt: 1,
          updatedAt: 1,
          isFavorite: 1,
        },
      }
    );
  }

  const resp = await Recipe.aggregate(pipeline);
  return resp.length > 0 ? resp[0] : null;
};

const createNewRecipe = async recipe => {
  const resp = await Recipe.create(recipe);
  return resp ? resp : null;
};

const deleteRecipeById = async ({ recipeId, owner }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { deletedCount } = await Recipe.deleteOne(
      { _id: recipeId, owner },
      { session }
    );

    if (!deletedCount) {
      throw HttpError(404, 'Recipe not found');
    }

    const result = await User.updateMany(
      { favRecipes: recipeId },
      {
        $pull: {
          favRecipes: recipeId,
        },
      },
      { session }
    );

    await session.commitTransaction();
    return { status: 'Ok' };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getPopular = async ({ skip, limit, userId }) => {
  const totalResults = await User.aggregate([
    { $unwind: '$favRecipes' },
    { $group: { _id: '$favRecipes', count: { $sum: 1 } } },
    { $count: 'total' },
  ]);

  const total = totalResults.length > 0 ? totalResults[0].total : 0;

  if (total === 0) {
    return zeroResp;
  } else if (total < limit) {
    zeroResp.total = total;
  }

  const pipeline = [
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
        owner: {
          _id: '$owner._id',
          avatar: '$owner.avatar',
          name: '$owner.name',
        },
        count: 1,
      },
    },
  ];

  if (userId) {
    pipeline.push(
      {
        $lookup: {
          from: 'users',
          let: {
            recipeId: '$_id',
            userId: mongoose.Types.ObjectId.createFromHexString(userId),
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$_id', '$$userId'] },
                    { $in: ['$$recipeId', '$favRecipes'] },
                  ],
                },
              },
            },
            { $count: 'isFavorite' },
          ],
          as: 'userFavorite',
        },
      },
      {
        $addFields: {
          isFavorite: {
            $cond: {
              if: { $gt: [{ $size: '$userFavorite' }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          owner: 1,
          area: 1,
          instructions: 1,
          description: 1,
          thumb: 1,
          time: 1,
          ingredients: 1,
          createdAt: 1,
          updatedAt: 1,
          isFavorite: 1,
        },
      }
    );
  } else {
    pipeline.push(
      {
        $addFields: {
          isFavorite: false,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          owner: 1,
          area: 1,
          instructions: 1,
          description: 1,
          thumb: 1,
          time: 1,
          ingredients: 1,
          createdAt: 1,
          updatedAt: 1,
          isFavorite: 1,
        },
      }
    );
  }

  const resp = await User.aggregate(pipeline);

  return resp ? { total, resipes: resp } : zeroResp;
};

export default {
  listRecipes,
  recipeById,
  createNewRecipe,
  deleteRecipeById,
  getPopular,
};
