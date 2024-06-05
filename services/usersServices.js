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

export default {
  register,
};
