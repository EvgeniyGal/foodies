import { Schema, model } from 'mongoose';

const ingredient = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export default model('Ingredient', ingredient);
