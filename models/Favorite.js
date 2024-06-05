import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const favoriteSchema = new Schema(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    recipe: {
      type: Schema.Types.ObjectId,
      ref: 'recipes',
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

favoriteSchema.post('save', handleSaveError);
favoriteSchema.pre('findOneAndUpdate', setUpdateSettings);
favoriteSchema.post('findOneAndUpdate', handleSaveError);

const Favorite = model('favorite', favoriteSchema);

export default Favorite;