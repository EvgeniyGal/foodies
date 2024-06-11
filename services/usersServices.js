import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import HttpError from '../helpers/HttpError.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const { SECRET_KEY } = process.env;
const userProjection = 'name token email avatar';
const recipeProjection = 'title instructions thumb';

const updateUserWithToken = async id => {
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '24h' });
  return await User.findByIdAndUpdate(id, { token });
};

const register = async body => {
  const { email, password } = body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw HttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...body,
    password: hashedPassword,
  });

  return await updateUserWithToken(user._id);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw HttpError(401, 'Email or password is wrong');
  }

  return await updateUserWithToken(user._id);
};

const authenticate = async token => {
  const { id } = jwt.verify(token, SECRET_KEY);

  const user = await findOne(id);

  if (!user) {
    throw HttpError(401, 'User not found');
  }

  return user;
};

const findOne = async id => await User.findById(id, userProjection);

const update = async (id, body) => await User.findByIdAndUpdate(id, body);

const followUser = async (followerId, followingId) => {
  const followingUser = await User.findByIdAndUpdate(followingId, {
    $addToSet: { followers: followerId },
  });
  if (!followingUser) {
    throw HttpError(400, 'No user found to add to following list');
  }

  return await User.findByIdAndUpdate(followerId, {
    $addToSet: { following: followingId },
  });
};

const unfollowUser = async (followerId, followingId) => {
  const followingUser = await User.findByIdAndUpdate(followingId, {
    $pull: { followers: followerId },
  });
  if (!followingUser) {
    throw HttpError(400, 'No user found to romove from following list');
  }

  return await User.findByIdAndUpdate(followerId, {
    $pull: { following: followingId },
  });
};

const getFollowUserList = async (_id, listType) => {
  if (!['following', 'followers'].includes(listType)) {
    throw HttpError(500, 'Unknown user list type');
  }

  const RECIPES_NUMBER = 10;

  const pipeline = [
    { $match: { _id: mongoose.Types.ObjectId.createFromHexString(_id) } },
    {
      $lookup: {
        from: 'users',
        localField: listType,
        foreignField: '_id',
        as: listType,
      },
    },
    {
      $lookup: {
        from: 'recipes',
        localField: listType,
        foreignField: 'owner',
        as: 'recipes',
      },
    },
    { $unwind: `$${listType}` },
    {
      $lookup: {
        from: 'recipes',
        localField: `${listType}._id`,
        foreignField: 'owner',
        pipeline: [
          {
            $project: {
              _id: 0,
              title: 1,
              thumb: 1,
            },
          },
        ],
        as: `${listType}.recipes`,
      },
    },
    {
      $addFields: {
        [`${listType}.recipesCount`]: { $size: `$${listType}.recipes` },
        [`${listType}.recipes`]: {
          $slice: [`$${listType}.recipes`, RECIPES_NUMBER],
        },
      },
    },
    {
      $group: {
        _id: '$_id',
        [`${listType}`]: {
          $push: {
            _id: `$${listType}._id`,
            name: `$${listType}.name`,
            avatar: `$${listType}.avatar`,
            recipesCount: `$${listType}.recipesCount`,
            recipes: `$${listType}.recipes`,
          },
        },
      },
    },
  ];

  const userList = await User.aggregate(pipeline);

  return userList;
};

const getFollowing = async _id => await getFollowUserList(_id, 'following');

const getFollowers = async _id => await getFollowUserList(_id, 'followers');

const likeRecipe = async (_id, recipeId) =>
  await User.findByIdAndUpdate(_id, { $addToSet: { favRecipes: recipeId } });

const unlikeRecipe = async (_id, recipeId) =>
  await User.findByIdAndUpdate(_id, { $pull: { favRecipes: recipeId } });

const getFavoriteRecipes = async _id =>
  await User.findOne({ _id }, 'favRecipes').populate(
    'favRecipes',
    recipeProjection
  );

const getUserInfo = async id => {
  const [result] = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) } },
    {
      $addFields: {
        favRecipes: { $ifNull: ['$favRecipes', []] },
      },
    },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: 'owner',
        as: 'recipes',
      },
    },
    {
      $project: {
        name: 1,
        email: 1,
        avatar: 1,
        followersQty: { $size: '$followers' },
        followingQty: { $size: '$following' },
        favRecipesQty: { $size: '$favRecipes' },
        recipesQty: { $size: '$recipes' },
      },
    },
  ]);

  if (!result) {
    throw HttpError(401, 'User not found');
  }

  return result;
};

const getResetToken = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  const resetToken = nanoid();
  await User.findOneAndUpdate({ email }, { resetPasswordToken: resetToken });
  return resetToken;
};

const resetPassword = async (resetToken, password) => {
  const user = await User.findOne({ resetPasswordToken: resetToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate(
    { resetPasswordToken: resetToken },
    {
      token: '',
      password: hashedPassword,
      resetPasswordToken: null,
    }
  );
};

export default {
  register,
  login,
  authenticate,
  findOne,
  update,
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  getUserInfo,
  likeRecipe,
  getFavoriteRecipes,
  unlikeRecipe,
  getResetToken,
  resetPassword,
};
