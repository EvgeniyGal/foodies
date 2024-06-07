import Joi from 'joi';
import { EMAIL_REGEXP } from '../constants/regExp.js';

const name = Joi.string().required();
const email = Joi.string().pattern(EMAIL_REGEXP).required();
const password = Joi.string().min(6).required();

export const registerUserSchema = Joi.object({
  name,
  email,
  password,
});

export const loginUserSchema = Joi.object({
  email,
  password,
});

export const resetPasswordSchema = Joi.object({
  password,
});

export const resetPasswordEmailSchema = Joi.object({
  email,
});
