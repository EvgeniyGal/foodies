import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';
import { EMAIL_REGEXP } from '../constants/regExp.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Username is required'],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: EMAIL_REGEXP,
    },
    token: {
      type: String,
      default: '',
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      required: true,
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      defualt: [],
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      defualt: [],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);

export default model('user', userSchema);
