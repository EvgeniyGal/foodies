import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    area: {
      type: Schema.Types.ObjectId,
      ref: 'area',
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [
        {
          _id: false,
          ingredient: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true,
          },
          measure: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

recipeSchema.post('save', handleSaveError);
recipeSchema.pre('findOneAndUpdate', setUpdateSettings);
recipeSchema.post('findOneAndUpdate', handleSaveError);

const Recipe = model('recipe', recipeSchema);
export default Recipe;
