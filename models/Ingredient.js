import { Schema, model } from 'mongoose';

const ingredient = new Schema(
  {
    name: {
      type: String,
      desc: String,
      img: String,
    },
  },
  {
    versionKey: false,
  }
);

export default model('Ingredient', ingredient);
