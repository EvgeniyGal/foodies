import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import HttpError from "../helpers/HttpError.js";
import User from "../models/User.js";

const { SECRET_KEY } = process.env;

const updateUserWithToken = async (id) => {
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '24h' });
  return await User.findByIdAndUpdate(id, { token });
}

const register = async (body) => {
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

const authenticate = async (token) => {
  const { id } = jwt.verify(token, SECRET_KEY);
  return await findOne(id);
};

const findOne = async (id) => await User.findById(id, '-password');

const update = async (id, body) => await User.findByIdAndUpdate(id, body);

const addToFollowing = async (followerId, followingId) => {
  const followingUser = await User.findByIdAndUpdate(followingId, { $addToSet: { followers: followerId } });
  if (!followingUser) {
    throw HttpError(400, 'No user found to add to following list');
  }

  return await User.findByIdAndUpdate(followerId, { $addToSet: { following: followingId } })
};


export default {
  register,
  login,
  authenticate,
  update,
  addToFollowing,
};
