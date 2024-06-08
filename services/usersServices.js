import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import HttpError from '../helpers/HttpError.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const { SECRET_KEY } = process.env;
const userProjection = 'name token email avatar';
const otherUserProjection = 'name email avatar followers';
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

const addToFollowing = async (followerId, followingId) => {
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

const removeFromFollowing = async (followerId, followingId) => {
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

const getFollowing = async _id =>
  await User.findOne({ _id }).populate('following', otherUserProjection);

const getFollowers = async _id =>
  await User.findOne({ _id }).populate('followers', otherUserProjection);

const likeRecipe = async (_id, recipeId) => await User.findByIdAndUpdate(_id, { $addToSet: { favRecipes: recipeId } });

const unlikeRecipe = async (_id, recipeId) => await User.findByIdAndUpdate(_id, { $pull: { favRecipes: recipeId } });

const getFavoriteRecipes = async (_id) => await User.findOne({ _id }, 'favRecipes').populate('favRecipes', recipeProjection);

const getUserInfo = async (id) => {
  const [result] = await User.aggregate([
    { $match: { _id: mongoose.Types.ObjectId.createFromHexString(id) } },
    {
      $addFields: {
        favRecipes: { $ifNull: ['$favRecipes', []] },
      }
    },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: 'owner',
        as: 'recipes',
      }
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
      }
    }
  ]);

  if (!result) {
    throw HttpError(401, 'User not found')
  }

  return result;
}

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
  User.findOneAndUpdate(
    { resetPasswordToken: resetToken },
    {
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
  addToFollowing,
  removeFromFollowing,
  getFollowing,
  getFollowers,
  getUserInfo,
  likeRecipe,
  getFavoriteRecipes,
  unlikeRecipe,
  getResetToken,
  resetPassword,
};
