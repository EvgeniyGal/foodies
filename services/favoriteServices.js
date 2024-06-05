import Favorite from '../models/Favorite.js';
import { Types } from 'mongoose';

const addFavorite = async ({ recipe, user }) => {
  const filter = { recipe };

  if (!Types.ObjectId.isValid(recipe)) {
    throw new Error(`Invalid recipe id: ${recipe}`);
  }
  if (!Types.ObjectId.isValid(user)) {
    throw new Error(`Invalid user id: ${user}`);
  }
  const favoriteRecipe = await Favorite.findOne(filter);

  if (favoriteRecipe) {
    if (favoriteRecipe.users.includes(user)) {
      return { message: 'User already in the list' };
    }
    const updatedUsers = [...favoriteRecipe.users, user];
    const resp = await Favorite.findOneAndUpdate(
      filter,
      {
        users: updatedUsers,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return resp ? resp : null;
  } else {
    const resp = await Favorite.create({ users: user, recipe });
    return resp ? resp : null;
  }
};

const deleteFavorite = async ({ recipe, user }) => {
  const filter = { recipe, users: user };

  if (!Types.ObjectId.isValid(recipe)) {
    throw new Error(`Invalid recipe id: ${recipe}`);
  }
  if (!Types.ObjectId.isValid(user)) {
    throw new Error(`Invalid user id: ${user}`);
  }
  const favoriteRecipe = await Favorite.findOne(filter);

  if (favoriteRecipe) {
    const updatedUsers = favoriteRecipe.users.filter(
      id => id.toString() !== user.toString()
    );
    const resp = await Favorite.findOneAndUpdate(
      filter,
      {
        users: updatedUsers,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return resp ? resp : null;
  } else {
    return null;
  }
};

const listFavorites = async ({ user }) => {
  const filter = { users: user };
  if (!Types.ObjectId.isValid(user)) {
    throw new Error(`Invalid user id: ${user}`);
  }
  const resp = await Favorite.find(filter);
  return resp ? resp : null;
};

const listPopular = async ({ skip, limit }) => {
  const query = { users: { $exists: true, $ne: [] } };
  const resp = await Favorite.find(query)
    .sort({ users: 1 })
    .skip(skip)
    .limit(limit);
  if (!resp) {
    return null;
  }

  return resp;
};

export { addFavorite, deleteFavorite, listFavorites, listPopular };
