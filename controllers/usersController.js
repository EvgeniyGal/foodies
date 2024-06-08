import fsPromises from 'fs/promises';
import path from 'path';

import ctrlWrapper from '../decorators/ctrlWrapper.js';
import usersServices from '../services/usersServices.js';
import gravatar from 'gravatar';
import HttpError from '../helpers/HttpError.js';
import Jimp from 'jimp';
import sgMail from '@sendgrid/mail';
import { getResetPasswordMsg } from '../helpers/emailTemplates.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const register = async (req, res) => {
  const { name, email, avatar, token } = await usersServices.register({
    ...req.body,
    avatar: gravatar.url(req.body.email),
  });

  res.status(201).json({
    user: {
      name,
      email,
      avatar,
      token,
    },
  });
};

const login = async (req, res) => {
  const user = await usersServices.login(req.body);
  const { name, email, avatar, token } = user;

  res.status(200).json({
    token,
    user: {
      name,
      email,
      avatar,
    },
  });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, 'No file attached');
  }
  const { _id } = req.user;
  const { path: tmpPath, filename } = req.file;
  const avatarsDir = path.resolve('public', 'avatars');
  await resizeAvatar(tmpPath);
  const avatarPath = path.join(avatarsDir, filename);
  await fsPromises.rename(tmpPath, avatarPath);
  const avatarURL = path.join('avatars', filename);
  await usersServices.update(_id, { avatar: avatarURL });

  res.status(200).json({
    avatar: avatarURL,
  });
};

const resizeAvatar = async avatarPath => {
  const avatar = await Jimp.read(avatarPath);
  await avatar.resize(250, 250).writeAsync(avatarPath);
};

const addToFollowing = async (req, res) => {
  const { _id } = req.user;
  const { userId, followingId } = req.params;

  if (_id !== userId) {
    throw HttpError(403);
  }

  const { following } = await usersServices.addToFollowing(userId, followingId);

  res.status(200).json({
    following,
  });
};

const removeFromFollowing = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: followingId } = req.params;

  const { following } = await usersServices.removeFromFollowing(
    userId,
    followingId
  );

  res.status(200).json({
    following,
  });
};

const getFollowing = async (req, res) => {
  const { id } = req.user;
  const { following } = await usersServices.getFollowing(id);

  const result = otherUsersListMap(following);

  res.status(200).json({
    following: result,
  });
};

const getFollowers = async (req, res) => {
  const { id } = req.user;
  const { followers } = await usersServices.getFollowers(id);

  const result = otherUsersListMap(followers);

  res.status(200).json({
    followers: result,
  });
};

const otherUsersListMap = userList => {
  return userList.map(({ _id, name, email, avatar, followers }) => {
    return {
      _id,
      name,
      email,
      avatar,
      followersQty: followers.length,
    };
  });
};

const getCurrentUser = (req, res) => {
  const { _id, name, email, avatar } = req.user;

  res.json({
    _id,
    name,
    email,
    avatar,
  });
};

const likeRecipe = async (req, res) => {
  const { id } = req.user;
  const { id: recipeId } = req.params;
  const { favRecipes } = await usersServices.likeRecipe(id, recipeId);

  res.status(200).json({
    favRecipes,
  });
};

const unlikeRecipe = async (req, res) => {
  const { id } = req.user;
  const { id: recipeId } = req.params;
  const { favRecipes } = await usersServices.unlikeRecipe(id, recipeId);

  res.status(200).json({
    favRecipes,
  });
};

const getFavoriteRecipes = async (req, res) => {
  const { id } = req.user;
  const { favRecipes } = await usersServices.getFavoriteRecipes(id);

  res.status(200).json(favRecipes);
};

const getUserProfile = async (req, res) => {
  const { id } = req.user;
  const { id: userId } = req.params;
  const userProfile = await usersServices.getUserInfo(userId);

  if (id !== userId) {
    //Other user data
    delete userProfile.followingQty;
    delete userProfile.favRecipesQty;
  }

  res.status(200).json(userProfile);
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await usersServices.update(_id, { token: null });
  res.status(204).send();
};

const sendResetEmail = async (req, res) => {
  const { email } = req.body;
  const resetToken = await usersServices.getResetToken(email);
  const msg = getResetPasswordMsg(email, resetToken);
  try {
    await sgMail.send(msg);
    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
};

const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  await usersServices.resetPassword(resetToken, password);
  res.redirect(process.env.FRONT_URL);
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  updateAvatar: ctrlWrapper(updateAvatar),
  addToFollowing: ctrlWrapper(addToFollowing),
  removeFromFollowing: ctrlWrapper(removeFromFollowing),
  getFollowing: ctrlWrapper(getFollowing),
  getFollowers: ctrlWrapper(getFollowers),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  likeRecipe: ctrlWrapper(likeRecipe),
  unlikeRecipe: ctrlWrapper(unlikeRecipe),
  getFavoriteRecipes: ctrlWrapper(getFavoriteRecipes),
  getUserProfile: ctrlWrapper(getUserProfile),
  sendResetEmail: ctrlWrapper(sendResetEmail),
  resetPassword: ctrlWrapper(resetPassword),
};
